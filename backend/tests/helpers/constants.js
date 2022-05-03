const DEFAULT_USER = {
  username: "tester",
  email: "tester@strapi.com",
  provider: "local",
  password: "1234abc",
  confirmed: true,
  blocked: null,
};

const SUCCESS_USER = {
  ...DEFAULT_USER,
  username: "tester2",
  email: "tester2@strapi.com",
};

module.exports = {
  DEFAULT_USER,
  DEFAULT_PRODUCT_ID: 1,
  SUCCESS_USER,
};
