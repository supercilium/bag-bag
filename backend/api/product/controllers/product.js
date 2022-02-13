const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

  async findOne(ctx) {
    const { slug } = ctx.params;

    await strapi
      .query("product")
      .model.query((qb) => {
        qb.where("slug", slug);
        qb.increment("views", 1);
      })
      .fetch();
    const entity = await strapi.services.product.findOne({ slug });

    return sanitizeEntity(entity, { model: strapi.models.product });
  },
};
