const request = require("supertest");
const {
  SUCCESS_PROMOCODE,
  SUCCESS_USER,
  EXPIRED_PROMOCODE,
} = require("../helpers/constants");

it("should check existing promocode", async () => {
  let user = await strapi.plugins["users-permissions"].services.user.fetch({
    email: SUCCESS_USER.email,
    username: SUCCESS_USER.username,
  });
  const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
    id: user.id,
  });
  const promo = await strapi
    .query("promocode")
    .create({ ...SUCCESS_PROMOCODE });

  await request(strapi.server)
    .get(`/promocodes/check/${promo.code}`)
    .set("Authorization", "Bearer " + jwt)
    .expect(200) // Expect response http code 200
    .then((data) => {
      expect(data.body.discount).toBe(10); // expect the response text
    });
});

it("should check expired promocode", async () => {
  let user = await strapi.plugins["users-permissions"].services.user.fetch({
    email: SUCCESS_USER.email,
    username: SUCCESS_USER.username,
  });
  const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
    id: user.id,
  });
  const promo = await strapi
    .query("promocode")
    .create({ ...EXPIRED_PROMOCODE });

  await request(strapi.server)
    .get(`/promocodes/check/${promo.code}`)
    .set("Authorization", "Bearer " + jwt)
    .expect(400)
    .then((data) => {
      expect(data.body.message).toBe("Promo code is expired"); // expect the response text
    });
});

it("should check wrong promocode", async () => {
  let user = await strapi.plugins["users-permissions"].services.user.fetch({
    email: SUCCESS_USER.email,
    username: SUCCESS_USER.username,
  });
  const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
    id: user.id,
  });

  await request(strapi.server)
    .get(`/promocodes/check/wrong`)
    .set("Authorization", "Bearer " + jwt)
    .expect(404);
});
