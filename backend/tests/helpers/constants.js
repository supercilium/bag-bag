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

const SUCCESS_PROMOCODE = {
  code: "promo code",
  validTill: "2122-05-04T12:23:43.000Z",
  discount: 10,
};

const EXPIRED_PROMOCODE = {
  code: "expired",
  validTill: "2000-05-04T12:23:43.000Z",
  discount: 10,
};

module.exports = {
  DEFAULT_USER,
  DEFAULT_PRODUCT_ID: 1,
  SUCCESS_USER,
  SUCCESS_PROMOCODE,
  EXPIRED_PROMOCODE,
};
