"use strict";
const { sanitizeEntity } = require("strapi-utils");
const { httpRequest } = require("../../../config/functions/request");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    const userFromContext = ctx.state.user;
    strapi.log.debug("user creating order ", ctx.state.user?.id);
    if (!userFromContext) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorization header was found" }] },
      ]);
    }

    const {
      last_name,
      delivery_cost,
      phone,
      email,
      shippingMethod,
      paymentMethod,
      products,
      total,
      discount,
      address,
      shipping_date,
    } = ctx.request.body;

    const items = await strapi
      .query("product")
      .find({ id_in: products.map((item) => item.id) });
    strapi.log.debug("items ", items);

    const availableItems = items?.filter((item) => item.is_available);
    strapi.log.debug("availableItems ", availableItems);

    if (!availableItems?.length) {
      strapi.log.debug("No available products");
      return ctx.send(
        {
          products,
          error: "Sorry, items in your bag is not available right now",
        },
        200
      );
    }

    if (availableItems?.length < products?.length) {
      strapi.log.debug("Some products are unavailable");
      return ctx.send(
        {
          products,
          error: "Sorry, some items in your bag is not available right now",
        },
        200
      );
    }

    const knex = strapi.connections.default;

    try {
      return await knex.transaction(async (transacting) => {
        if (!userFromContext?.phone && phone) {
          // update user

          await strapi.query("user", "users-permissions").update(
            { id: userFromContext.id },
            {
              // last_name,
              phone,
              // email,
            },
            { transacting }
          );
          strapi.log.debug("updated user info");
        }

        let entity = await strapi.query("order").create(
          {
            last_name,
            delivery_cost,
            email,
            phone,
            products: availableItems,
            user: userFromContext.id,
            paymentMethod,
            shippingMethod,
            status: "new",
            total,
            discount,
            address,
            shipping_date,
          },
          { transacting }
        );
        strapi.log.debug(
          "created order",
          entity.id,
          entity.status,
          entity.total,
          entity.user.id
        );

        const availableItemsIds = availableItems?.map((item) => item.id);

        await strapi
          .query("product")
          .model.query((qb) => {
            qb.whereIn("id", availableItemsIds).update({ is_available: false });
          })
          .fetch({ transacting });
        strapi.log.debug("making products unavailable ", availableItemsIds);

        // get redirect URL from sber
        const options = {
          hostname: process.env.PAYMENT_HOST,
          port: 443,
          path: `/payment/rest/register.do?userName=${
            process.env.PAYMENT_USERNAME
          }&password=${process.env.PAYMENT_PASSWORD}&orderNumber=${
            entity?.id
          }&amount=${total * 100}&returnUrl=${
            process.env.PAYMENT_RETURN_URL
          }&id=${entity.id}&failUrl=${process.env.PAYMENT_FAIL_URL}&id=${
            entity.id
          }`,
          method: "POST",
        };
        // orderId Номер заказа в платежной системе.
        // formUrl URL-адрес платёжной формы, на который нужно перенаправить браузер клиента.
        // errorCode Код ошибки. Может отсутствовать, если результат не привёл к ошибке.
        // errorMessage Описание ошибки на языке, переданном в параметре language в запросе.
        const paymentData = await httpRequest(options);
        strapi.log.debug("created order on processing ", paymentData);

        // error on processing side
        if (
          +paymentData?.errorCode > 0 ||
          !paymentData?.formUrl ||
          !paymentData?.orderId
        ) {
          strapi.log.error(paymentData?.errorMessage);
          await transacting.rollback(paymentData?.errorMessage);
        }

        entity = await strapi.query("order").update(
          {
            id: entity.id,
          },
          {
            foreign_order_id: paymentData.orderId,
          },
          { transacting }
        );
        strapi.log.debug("updated order ", paymentData.orderId);

        // clear shopping bag
        await knex("components_shopping_bag_shopping_bags__products")
          .transacting(transacting)
          .where({
            components_shopping_bag_shopping_bag_id:
              userFromContext.shopping_bag?.id,
          })
          .delete()
          .catch(transacting.rollback);

        strapi.log.debug("cleared shopping bag");
        if (entity) {
          entity = sanitizeEntity(entity, "order");
        }
        ctx.body = { ...entity, formUrl: paymentData.formUrl };
      });
    } catch (error) {
      strapi.log.error(error);

      return ctx.badRequest(error);
    }
  },
  async update(ctx) {
    const { id } = ctx.params;

    const [order] = await strapi.services.order.find({
      id,
      "user.id": ctx.state.user.id,
    });
    if (!order) {
      return ctx.unauthorized("You can't update this entry");
    }
    if (order?.status !== "new") {
      ctx.status = 204;
    }
    strapi.log.debug("updating order ", order.id);
    const knex = strapi.connections.default;
    try {
      return await knex.transaction(async (transacting) => {
        // get redirect URL from sber
        const options = {
          hostname: process.env.PAYMENT_HOST,
          port: 443,
          path: `/payment/rest/getOrderStatusExtended.do?userName=${process.env.PAYMENT_USERNAME}&password=${process.env.PAYMENT_PASSWORD}&orderNumber=${order?.id}&orderId=${order.foreign_order_id}`,
          method: "POST",
        };
        // https://securepayments.sberbank.ru/wiki/doku.php/integration:api:ws:requests:getorderstatusextended
        // orderStatus
        // 0 - заказ зарегистрирован, но не оплачен;
        // 1 - предавторизованная сумма удержана (для двухстадийных платежей);
        // 2 - проведена полная авторизация суммы заказа;
        // 3 - авторизация отменена;
        // 4 - по транзакции была проведена операция возврата;
        // 5 - инициирована авторизация через сервер контроля доступа банка-эмитента;
        // 6 - авторизация отклонена.
        // actionCode
        // actionCodeDescription
        // errorCode
        // errorMessage
        const paymentData = await httpRequest(options);
        strapi.log.debug("created order on processing: ");
        strapi.log.debug("orderStatus: ", paymentData.orderStatus);
        strapi.log.debug(
          `actionCode: ${paymentData.actionCode} - ${paymentData.actionCodeDescription}`
        );

        // error on processing side
        if (paymentData?.errorCode) {
          strapi.log.error(paymentData?.errorMessage);
          await transacting.rollback(paymentData?.errorMessage);
        }
        let status;

        switch (paymentData.orderStatus) {
          case 0:
          case 5:
            status = "new";
            break;
          case 1:
          case 2:
            status = "paid";
            break;
          case 3:
          case 6:
            status = "cancelled";
            break;
          case 4:
            status = "return";
            break;
          default:
            status = "new";
        }

        let entity = await strapi.query("order").update(
          {
            id,
          },
          {
            status,
          },
          { transacting }
        );
        strapi.log.debug("updated order ", entity.status);

        ctx.status = 204;
      });
    } catch (error) {
      return ctx.badRequest(error);
    }
  },
};
