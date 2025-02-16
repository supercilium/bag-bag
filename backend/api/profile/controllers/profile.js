"use strict";
const _ = require("lodash");
const { sanitizeUser } = require("../../../config/functions/user");

const formatError = (error) => [
  { messages: [{ id: error.id, message: error.message, field: error.field }] },
];

module.exports = {
  async changePassword(ctx) {
    const userFromContext = ctx.state.user;

    if (!userFromContext) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorization header was found" }] },
      ]);
    }

    const params = _.assign({}, ctx.request.body);
    if (
      params.currentPassword &&
      params.newPassword &&
      params.confirmNewPassword &&
      params.newPassword === params.confirmNewPassword
    ) {
      const user = await strapi.plugins[
        "users-permissions"
      ].services.user.fetch(
        {
          id: userFromContext.id,
        },
        ["role"]
      );

      if (!user) {
        return ctx.badRequest("User does not exist");
      }

      const validPassword = await strapi.plugins[
        "users-permissions"
      ].services.user.validatePassword(params.currentPassword, user.password);

      if (!validPassword) {
        return ctx.badRequest("Old password does not match.");
      }

      let updateData = { password: params.newPassword };
      const data = await strapi.plugins["users-permissions"].services.user.edit(
        { id: user.id },
        updateData
      );
      return ctx.send(sanitizeUser(data));
    }

    return ctx.badRequest("New passwords do not match.");
  },
  async changeAddress(ctx) {
    const userFromContext = ctx.state.user;

    if (!userFromContext) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorization header was found" }] },
      ]);
    }

    const params = _.assign({}, ctx.request.body);
    if (params.line1 && params.city && params.state && params.postal_code) {
      let updateData = { shipping_address: params };
      const data = await strapi.plugins["users-permissions"].services.user.edit(
        { id: userFromContext.id },
        updateData
      );
      return ctx.send(sanitizeUser(data));
    }

    return ctx.badRequest("Address is not valid");
  },
  async update(ctx) {
    const advancedConfigs = await strapi
      .store({
        environment: "",
        type: "plugin",
        name: "users-permissions",
        key: "advanced",
      })
      .get();

    const { id } = ctx.params;
    const { email, username, phone } = ctx.request.body;

    if (_.has(ctx.request.body, "email") && !email) {
      return ctx.badRequest("email.notNull");
    }

    if (_.has(ctx.request.body, "username") && !username) {
      return ctx.badRequest("username.notNull");
    }

    if (_.has(ctx.request.body, "phone") && !phone) {
      return ctx.badRequest("phone.notNull");
    }

    if (_.has(ctx.request.body, "username")) {
      const userWithSameUsername = await strapi
        .query("user", "users-permissions")
        .findOne({ username });

      if (userWithSameUsername && userWithSameUsername.id != id) {
        return ctx.badRequest(
          null,
          formatError({
            id: "Auth.form.error.username.taken",
            message: "username.alreadyTaken.",
            field: ["username"],
          })
        );
      }
    }

    if (_.has(ctx.request.body, "email") && advancedConfigs.unique_email) {
      const userWithSameEmail = await strapi
        .query("user", "users-permissions")
        .findOne({ email: email.toLowerCase() });

      if (userWithSameEmail && userWithSameEmail.id != id) {
        return ctx.badRequest(
          null,
          formatError({
            id: "Auth.form.error.email.taken",
            message: "Email already taken",
            field: ["email"],
          })
        );
      }
      ctx.request.body.email = ctx.request.body.email.toLowerCase();
    }

    let updateData = {
      ...ctx.request.body,
    };

    const data = await strapi.plugins["users-permissions"].services.user.edit(
      { id },
      updateData
    );

    ctx.send(sanitizeUser(data));
  },
  async addToFavorite(ctx) {
    const userFromContext = ctx.state.user;

    if (!userFromContext) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorization header was found" }] },
      ]);
    }

    const { id } = ctx.query;

    const product = await strapi.query("product").findOne({ id });

    if (!product) {
      if (!userFromContext) {
        return ctx.badRequest("No products found");
      }
    }

    const knex = strapi.connections.default;

    await knex("products_users__users_favorites")
      .insert({
        user_id: userFromContext.id,
        product_id: id,
      })
      .onConflict(["user_id", "product_id"])
      .ignore();

    let data = await strapi.plugins["users-permissions"].services.user.fetch(
      {
        id: userFromContext.id,
      },
      [
        "favorites",
        "favorites.color",
        "favorites.images",
        "favorites.brand",
        "favorites.category",
      ]
    );

    if (data) {
      data = sanitizeUser(data);
    }

    // Send 200 `ok`
    ctx.body = data;
    return ctx.send(data, 200);
  },
  async removeFromFavorite(ctx) {
    const userFromContext = ctx.state.user;

    if (!userFromContext) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorization header was found" }] },
      ]);
    }

    const { id } = ctx.query;

    const product = await strapi.query("product").findOne({ id });

    if (!product) {
      if (!userFromContext) {
        return ctx.badRequest("No products found");
      }
    }

    const knex = strapi.connections.default;

    await knex("products_users__users_favorites")
      .where({
        user_id: userFromContext.id,
        product_id: id,
      })
      .delete();
    let data = await strapi.plugins["users-permissions"].services.user.fetch(
      {
        id: userFromContext.id,
      },
      [
        "favorites",
        "favorites.color",
        "favorites.images",
        "favorites.brand",
        "favorites.category",
      ]
    );

    if (data) {
      data = sanitizeUser(data);
    }

    // Send 200 `ok`
    ctx.body = data;
    return ctx.send(data, 200);
  },
  async profile(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorization header was found" }] },
      ]);
    }

    const { id } = user;
    let data = await strapi.plugins["users-permissions"].services.user.fetch(
      {
        id,
      },
      [
        "favorites",
        "favorites.color",
        "favorites.images",
        "favorites.brand",
        "favorites.category",
        "orders",
        "shopping_bag.products.brand",
        "shopping_bag.products.category",
        "shopping_bag.products.color",
        "shopping_bag.products.images",
      ]
    );

    if (data) {
      data = sanitizeUser(data);
    }

    // Send 200 `ok`
    ctx.body = data;
  },
  async removeFromFShoppingBag(ctx) {
    const userFromContext = ctx.state.user;

    if (!userFromContext) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorization header was found" }] },
      ]);
    }

    const { id } = ctx.query;

    const product = await strapi.query("product").findOne({ id });

    if (!product) {
      if (!userFromContext) {
        return ctx.badRequest("No products found");
      }
    }

    const knex = strapi.connections.default;
    await knex("components_shopping_bag_shopping_bags__products")
      .where({
        components_shopping_bag_shopping_bag_id:
          userFromContext.shopping_bag?.id,
        product_id: id,
      })
      .delete();

    let data = await strapi.plugins["users-permissions"].services.user.fetch(
      {
        id: userFromContext.id,
      },
      [
        "favorites",
        "favorites.color",
        "favorites.images",
        "favorites.brand",
        "favorites.category",
      ]
    );

    if (data) {
      data = sanitizeUser(data);
    }

    // Send 200 `ok`
    ctx.body = data;
  },
  async addToShoppingBag(ctx) {
    const userFromContext = ctx.state.user;

    if (!userFromContext) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorization header was found" }] },
      ]);
    }

    const knex = strapi.connections.default;
    strapi.log.debug("adding to shopping_bag products ", ctx.query);

    const products = await strapi
      .query("product")
      .find({ ...ctx.query, is_available: true });

    if (!products) {
      if (!userFromContext) {
        return ctx.badRequest("No products found");
      }
    }
    let shoppingBagId = userFromContext.shopping_bag?.id;
    strapi.log.debug("sgopping bag ", userFromContext.shopping_bag?.id);

    return await knex.transaction(async (transacting) => {
      if (typeof shoppingBagId === "undefined" || shoppingBagId === null) {
        strapi.log.debug("creating new shopping_bag");
        await strapi.query("user", "users-permissions").update(
          { id: userFromContext.id },
          {
            shopping_bag: {},
          },
          { transacting }
        );

        const user = await strapi
          .query("user", "users-permissions")
          .findOne({ id: userFromContext.id }, ["shopping_bag"], {
            transacting,
          });
        shoppingBagId = user.shopping_bag.id;
        strapi.log.debug("created new shopping_bag ", shoppingBagId);
      }

      let dataForInsert = null;
      if (typeof ctx.query?.id !== undefined && ctx.query?.id !== null) {
        dataForInsert = {
          components_shopping_bag_shopping_bag_id: shoppingBagId,
          product_id: ctx.query.id,
        };
      }
      if (Array.isArray(ctx.query?.id_in) && ctx.query.id_in.length) {
        dataForInsert = ctx.query.id_in.map((id) => ({
          components_shopping_bag_shopping_bag_id: shoppingBagId,
          product_id: id,
        }));
      }
      if (typeof ctx.query?.id_in === "string") {
        dataForInsert = {
          components_shopping_bag_shopping_bag_id: shoppingBagId,
          product_id: ctx.query.id_in,
        };
      }

      await knex("components_shopping_bag_shopping_bags__products")
        .transacting(transacting)
        .insert(dataForInsert)
        .onConflict(["components_shopping_bag_shopping_bag_id", "product_id"])
        .ignore()
        .catch(transacting.rollback);

      let data = await strapi.query("user", "users-permissions").findOne(
        {
          id: userFromContext.id,
        },
        [
          "favorites",
          "favorites.color",
          "favorites.images",
          "favorites.brand",
          "favorites.category",
        ],
        { transacting }
      );

      if (data) {
        data = sanitizeUser(data);
      }

      // Send 200 `ok`
      ctx.body = data;
    });
  },
  async clearShoppingBag(ctx) {
    const userFromContext = ctx.state.user;

    if (!userFromContext) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorization header was found" }] },
      ]);
    }
    const knex = strapi.connections.default;

    await knex("components_shopping_bag_shopping_bags__products")
      .where({
        components_shopping_bag_shopping_bag_id:
          userFromContext.shopping_bag?.id,
      })
      .delete();

    let data = await strapi.plugins["users-permissions"].services.user.fetch(
      {
        id: userFromContext.id,
      },
      [
        "favorites",
        "favorites.color",
        "favorites.images",
        "favorites.brand",
        "favorites.category",
      ]
    );

    if (data) {
      data = sanitizeUser(data);
    }

    // Send 200 `ok`
    ctx.body = data;
  },
};
