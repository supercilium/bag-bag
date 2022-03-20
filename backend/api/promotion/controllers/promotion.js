"use strict";
const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    // eslint-disable-next-line no-unused-vars
    const { slug, ...query } = ctx.query;
    const entity = await strapi.services.promotion.find(query, [
      "products.brand",
      "products.images",
      "banner",
    ]);

    return sanitizeEntity(entity, { model: strapi.models.promotion });
  },
};
