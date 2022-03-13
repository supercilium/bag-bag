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
      return ctx.badRequest("Пользователь с такой почтой уже существует.");
    }

    await strapi.services.subscriber.create(ctx.request.body);

    try {
      await strapi.plugins["email"].services.email.send(
        getSubscriberGreetingEmail(email)
      );
      return ctx.send({
        subscribe: "Подписка успешно оформлена. Проверьте, пожалуйста, почту.",
      });
    } catch (error) {
      strapi.log.error(error);
    }

    return ctx.badRequest("Something went wrong");
  },
};
