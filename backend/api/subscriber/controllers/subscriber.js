"use strict";
const {
  getSubscriberGreetingEmail,
} = require("../../../config/functions/emailTemplates");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    const { email } = ctx.request.body;
    const existingSub = await strapi.services.subscriber.findOne({ email });
    if (existingSub) {
      return ctx.badRequest("Email is already used");
    }

    await strapi.services.subscriber.create(ctx.request.body);

    try {
      await strapi.plugins["email"].services.email.send(
        getSubscriberGreetingEmail(email)
      );
      ctx.send("Subscribed");
    } catch (error) {
      strapi.log.error(error);
    }

    return ctx.badRequest("Something went wrong");
  },
};
