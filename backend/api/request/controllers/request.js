"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    let entity;

    const userFromContext = ctx.state.user;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);

      try {
        if (userFromContext) {
          entity = await strapi.services.request.create(
            { ...data, user: userFromContext.id },
            { files }
          );
        } else {
          entity = await strapi.services.request.create(data, { files });
        }
        strapi.log.debug(entity);
      } catch (error) {
        strapi.log.error(error);
        return ctx.send("Incorrect request", 400);
      }
    } else {
      return ctx.send("Incorrect request", 400);
    }
    return sanitizeEntity(entity, { model: strapi.models.request });
  },
};
