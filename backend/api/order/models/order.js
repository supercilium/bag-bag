"use strict";
const {
  getOrderChangedStatusEmail,
} = require("../../../config/functions/emailTemplates");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async beforeUpdate(params, data) {
      strapi.log.debug("beforeUpdate order data ", data);
      strapi.log.debug("beforeUpdate order params ", params);
      strapi.log.debug("beforeUpdate order sending email");
      if (process.env.NODE_ENV !== "test") {
        try {
          const { email } = await strapi.plugins[
            "users-permissions"
          ].services.user.fetch({ id: data.user });
          if (data.status && email) {
            await strapi.plugins["email"].services.email.send(
              getOrderChangedStatusEmail(email, data.id)
            );
          }
        } catch (error) {
          strapi.log.error(error);
        }

        if (data.status === "cancelled" || data.status === "return") {
          // if order became cancelled, find all items from order and make it available
          try {
            const knex = strapi.connections.default;
            await strapi
              .query("product")
              .model.query((qb) => {
                qb.whereIn(
                  "id",
                  knex("orders_products")
                    .where({ order_id: params.id })
                    .select("product_id")
                ).update({ is_available: true });
              })
              .fetch();
            strapi.log.debug("updated items' availability");
          } catch (error) {
            strapi.log.error(error);
          }
        }
        if (data.user && data.status === "paid") {
          data.status = "delivering";
        }
      }
    },
  },
};
