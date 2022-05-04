const request = require("supertest");
const {
  DEFAULT_USER,
  SUCCESS_USER,
  DEFAULT_PRODUCT_ID,
} = require("../helpers/constants");

it("should login user and return jwt token", async () => {
  /** Creates a new user and save it to the database */
  await strapi.plugins["users-permissions"].services.user.add({
    ...DEFAULT_USER,
  });

  await request(strapi.server) // app server is an instance of Class: http.Server
    .post("/auth/local")
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .send({
      identifier: DEFAULT_USER.email,
      password: DEFAULT_USER.password,
    })
    .expect("Content-Type", /json/)
    .expect(200)
    .then((data) => {
      expect(data.body.jwt).toBeDefined();
    });
});

it("should return users data for authenticated user", async () => {
  console.info("should return users data for authenticated user");
  /** Gets the default user role */
  const defaultRole = await strapi
    .query("role", "users-permissions")
    .findOne({}, []);

  const role = defaultRole ? defaultRole.id : null;

  /** Creates a new user an push to database */
  const user = await strapi.plugins["users-permissions"].services.user.add({
    ...SUCCESS_USER,
    role,
  });

  const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
    id: user.id,
  });

  await request(strapi.server) // app server is an instance of Class: http.Server
    .get("/users/me")
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .expect("Content-Type", /json/)
    .expect(200)
    .then((data) => {
      expect(data.body).toBeDefined();
      expect(data.body.id).toBe(user.id);
      expect(data.body.username).toBe(user.username);
      expect(data.body.email).toBe(user.email);
    });
});

it("should add product to shopping bag", async () => {
  console.info("should add product to shopping bag");
  let user = await strapi.plugins["users-permissions"].services.user.fetch({
    email: SUCCESS_USER.email,
    username: SUCCESS_USER.username,
  });

  const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
    id: user.id,
  });

  await request(strapi.server) // app server is an instance of Class: http.Server
    .put(`/profile/add-to-shopping-bag?id=${DEFAULT_PRODUCT_ID}`)
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .expect("Content-Type", /json/)
    .expect(200)
    .then((data) => {
      expect(data.body).toBeDefined();
      expect(data.body.id).toBe(user.id);
      expect(data.body.username).toBe(user.username);
      expect(data.body.email).toBe(user.email);
      expect(data.body.shopping_bag.products.length).toBe(1);
    });

  let data = await strapi.plugins["users-permissions"].services.user.fetch(
    {
      id: user.id,
    },
    ["shopping_bag.products.brand"]
  );

  expect(data.shopping_bag.products.length).toBe(1);
});
