const request = require("supertest");
const { SUCCESS_USER, DEFAULT_PRODUCT_ID } = require("../helpers/constants");
const { httpRequest } = require("../../config/functions/request.js");

jest.mock("../../config/functions/request.js", () => ({
  httpRequest: jest.fn(() => ({ orderId: 1, formUrl: "formUrl" })),
}));

it("should get error when create order (no user)", async () => {
  console.info("should get error when create order (no user)");
  await request(strapi.server)
    .post("/orders")
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + "jwt")
    .send({
      last_name: "last name",
      delivery_cost: 1200,
      phone: "89139440199",
      email: "mail@mail.ru",
      shippingMethod: "card",
      paymentMethod: "shipping",
      products: [{ id: DEFAULT_PRODUCT_ID }],
      total: 30000,
      discount: 0,
      address: "address",
      shipping_date: "2022-05-12T05:26:00.000Z",
    })
    .expect(401);
});

it("should get error when create order (payment gateway error)", async () => {
  console.info("should get error when create order (payment gateway error)");
  httpRequest.mockReturnValueOnce(new Error("error"));
  let user = await strapi.plugins["users-permissions"].services.user.fetch({
    email: SUCCESS_USER.email,
    username: SUCCESS_USER.username,
  });

  const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
    id: user.id,
  });

  await request(strapi.server) // app server is an instance of Class: http.Server
    .post("/orders")
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .send({
      last_name: "last name",
      delivery_cost: 1200,
      phone: "89139440199",
      email: "mail@mail.ru",
      shippingMethod: "card",
      paymentMethod: "shipping",
      products: [{ id: DEFAULT_PRODUCT_ID }],
      total: 30000,
      discount: 0,
      address: "address",
      shipping_date: "2022-05-12T05:26:00.000Z",
    })
    .expect(400);

  user = await strapi.plugins["users-permissions"].services.user.fetch({
    email: SUCCESS_USER.email,
    username: SUCCESS_USER.username,
  });

  expect(user.orders.length).toBe(0);
});

it("should get error when create order (payment error code)", async () => {
  console.info("should get error when create order (payment error code)");
  httpRequest.mockReturnValueOnce({
    errorCode: 1,
    errorMessage: "errorMessage",
  });
  let user = await strapi.plugins["users-permissions"].services.user.fetch({
    email: SUCCESS_USER.email,
    username: SUCCESS_USER.username,
  });

  const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
    id: user.id,
  });

  await request(strapi.server) // app server is an instance of Class: http.Server
    .post("/orders")
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .send({
      last_name: "last name",
      delivery_cost: 1200,
      phone: "89139440199",
      email: "mail@mail.ru",
      shippingMethod: "card",
      paymentMethod: "shipping",
      products: [{ id: DEFAULT_PRODUCT_ID }],
      total: 30000,
      discount: 0,
      address: "address",
      shipping_date: "2022-05-12T05:26:00.000Z",
    })
    .expect(400)
    .then((data) => {
      expect(data.body).toBeDefined();
      expect(data.body.message).toBe("errorMessage");
    });

  user = await strapi.plugins["users-permissions"].services.user.fetch({
    email: SUCCESS_USER.email,
    username: SUCCESS_USER.username,
  });

  expect(user.orders.length).toBe(0);
});

it("should create order", async () => {
  console.info("should create order");
  let user = await strapi.plugins["users-permissions"].services.user.fetch({
    email: SUCCESS_USER.email,
    username: SUCCESS_USER.username,
  });

  const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
    id: user.id,
  });

  await request(strapi.server) // app server is an instance of Class: http.Server
    .post("/orders")
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .send({
      last_name: "last name",
      delivery_cost: 1200,
      phone: "89139440199",
      email: "mail@mail.ru",
      shippingMethod: "card",
      paymentMethod: "shipping",
      products: [{ id: DEFAULT_PRODUCT_ID }],
      total: 30000,
      discount: 0,
      address: "address",
      shipping_date: "2022-05-12T05:26:00.000Z",
    })
    .expect(200) // Expect response http code 200
    .then((data) => {
      expect(data.body).toBeDefined();
      expect(data.body.formUrl).toBe("formUrl");
    });

  user = await strapi.plugins["users-permissions"].services.user.fetch({
    email: SUCCESS_USER.email,
    username: SUCCESS_USER.username,
  });

  expect(user.orders.length).toBe(1);
  expect(user.shopping_bag.products.length).toBe(0);
  expect(user.phone).toBe("89139440199");
});
