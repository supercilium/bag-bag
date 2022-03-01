"use strict";
const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    const categories = await strapi.query("category").find();
    const brands = await strapi.query("brand").find();
    const collections = await strapi.query("collection").find();

    ctx.body = {
      categories: sanitizeEntity(categories, { model: strapi.models.category }),
      brands: sanitizeEntity(brands, { model: strapi.models.brand }),
      collections: sanitizeEntity(collections, {
        model: strapi.models.collection,
      }),
    };
  },
};
