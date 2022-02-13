const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  sanitizeUser: (user) =>
    sanitizeEntity(user, {
      model: strapi.query("user", "users-permissions").model,
    }),
};
