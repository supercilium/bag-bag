"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    const userFromContext = ctx.state.user;
    if (!userFromContext) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorization header was found" }] },
      ]);
    }

    const {
      last_name,
      phone,
      email,
      shippingMethod,
      paymentMethod,
      products,
      total,
      discount,
      //   address,
      //   shipping_date,
    } = ctx.request.body;

    // update user
    await strapi.plugins["users-permissions"].services.user.edit(
      { id: userFromContext.id },
      {
        last_name,
        phone,
        email,
      }
    );
    strapi.log.debug("updated user info");

    const entity = await strapi.services.order.create({
      products,
      user: userFromContext.id,
      paymentMethod,
      shippingMethod,
      status: "new",
      total,
      discount,
    });
    strapi.log.debug("created order", entity);

    const knex = strapi.connections.default;

    // clear shopping bag
    await knex("components_shopping_bag_shopping_bags__products")
      .where({
        components_shopping_bag_shopping_bag_id:
          userFromContext.shopping_bag?.id,
      })
      .delete();
    strapi.log.debug("cleared shopping bag");

    ctx.body = entity;
  },
};
