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
            products,
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
        strapi.log.debug("created order", entity);

        // get redirect URL from sber
        const options = {
          hostname: process.env.PAYMENT_HOST,
          port: 443,
          path: `/payment/rest/register.do?userName=${
            process.env.PAYMENT_USERNAME
          }&password=${process.env.PAYMENT_PASSWORD}&orderNumber=${
            entity?.id
          }&amount=${total * 100}&returnUrl=${process.env.PAYMENT_RETURN_URL}/${
            entity.id
          }&failUrl=${process.env.PAYMENT_FAIL_URL}/${entity.id}`,
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
      return ctx.badRequest(error);
    }
  },
};
