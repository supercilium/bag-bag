"use strict";
const isPast = require("date-fns/isPast");
const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async check(ctx) {
    const { code } = ctx.params;
    const user = ctx.state.user.id;

    if (!user) {
      return ctx.unauthorized("Unauthorized");
    }

    if (code) {
      // move to functions
      const promocode = await strapi.query("promocode").findOne({ code: code });

      if (!promocode) {
        return ctx.badRequest("Promo code is not found");
      }

      if (isPast(new Date(promocode.validTill))) {
        return ctx.badRequest("Promo code is expired");
      }
      const knex = strapi.connections.default;
      const count = await knex
        .select(knex.raw("count(orders.id) as count"))
        .from("orders")
        .where({ user: user, promocode: promocode.id });

      if (count?.[0]?.count > 0) {
        return ctx.badRequest("Promo code is already used by you");
      }
      return sanitizeEntity(promocode, { model: strapi.models["promocode"] });
    }
    return ctx.badRequest("Code is empty");
  },
};
