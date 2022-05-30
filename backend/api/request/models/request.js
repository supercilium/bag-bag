"use strict";
const {
  getRequestCreationEmail,
} = require("../../../config/functions/emailTemplates");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */
module.exports = {
  async afterCreate(data) {
    strapi.log.debug("afterCreate request data ", data?.id);
    try {
      strapi.log.debug("afterCreate sending email to manager");
      const { user, email, name, phone } = data;
      let params = user ? user : { email, name, phone };
      await strapi.plugins["email"].services.email.send(
        getRequestCreationEmail(
          params.email,
          data.id,
          params.name,
          params.phone
        )
      );
    } catch (error) {
      strapi.log.error(error);
    }
  },
};
