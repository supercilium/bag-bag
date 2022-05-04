"use strict";
const isPast = require("date-fns/isPast");
const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  async check(code, user, knexInstance) {
    if (code) {
      // move to functions
      const promocode = await strapi.query("promocode").findOne({ code: code });

      if (!promocode) {
        strapi.log.debug("No promocode");
        return { statusCode: 404, data: {} };
      }

      if (isPast(new Date(promocode.validTill))) {
        strapi.log.debug("Promo code is expired");
        return { statusCode: 400, data: { message: "Promo code is expired" } };
      }

      const knex = knexInstance || strapi.connections.default;
      const count = await knex
        .select(knex.raw("count(orders.id) as count"))
        .from("orders")
        .where({ user: user, promocode: promocode.id });

      if (count?.[0]?.count > 0) {
        strapi.log.debug("Promo code is already used by you");
        return {
          statusCode: 400,
          data: { message: "Promo code is already used by you" },
        };
      }

      strapi.log.debug("Normal promocode");
      return {
        statusCode: 200,
        data: sanitizeEntity(promocode, { model: strapi.models["promocode"] }),
      };
    }
    return {
      statusCode: 400,
      data: { message: "Code is empty" },
    };
  },
};
