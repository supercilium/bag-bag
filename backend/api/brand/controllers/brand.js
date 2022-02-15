"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findWithCounts(ctx) {
    const knex = strapi.connections.default;
    const brands = await knex
      .select(
        knex.raw(
          "brands.id, brands.name, brands.slug, count(products.id) as products"
        )
      )
      .from("brands")
      .leftJoin("products", "brands.id", "products.brand")
      .groupByRaw("brands.id, brands.name, brands.slug");
    ctx.body = brands;
  },
};
