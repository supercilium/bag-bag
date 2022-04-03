"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findWithCounts(ctx) {
    const knex = strapi.connections.default;
    const brands = await knex
      .with("brands_preview", (qb) => {
        qb.select("upload_file_morph.related_id", "formats")
          .from("upload_file_morph")
          .leftJoin("upload_file as files", "upload_file_id", "files.id")
          .where("related_type", "brands");
      })
      .select("brands.id", "brands.name", "brands.slug", "formats as preview")
      .from("brands")
      .leftJoin("brands_preview as up", function () {
        this.on("brands.id", "=", "up.related_id");
      })
      .select(
        knex.raw(
          "brands.id, brands.name, brands.slug, count(products.id) as products"
        )
      )
      .leftJoin("products", "brands.id", "products.brand")
      .groupByRaw("brands.id, brands.name, brands.slug, preview");

    try {
      ctx.body = brands.map((item) => ({
        ...item,
        preview: item.preview ? JSON.parse(item.preview) : null,
      }));
    } catch (err) {
      strapi.log.error(err);
      ctx.body = err;
    }
  },
};
