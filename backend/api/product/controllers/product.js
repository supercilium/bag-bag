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
        qb.where({ slug, is_available: true });
        qb.increment("views", 1);
      })
      .fetch();
    const entity = await strapi.services.product.findOne({
      slug,
      is_available: true,
    });

    return sanitizeEntity(entity, { model: strapi.models.product });
  },
  async find() {
    const entity = await strapi.query("product").find({ is_available: true });

    return sanitizeEntity(entity, { model: strapi.models.product });
  },
};
