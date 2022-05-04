"use strict";

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

    const { statusCode, data } = await strapi.services.promocode.check(
      code,
      user
    );
    strapi.log.debug("check promocode", data);

    return ctx.send(data, statusCode);
  },
};
