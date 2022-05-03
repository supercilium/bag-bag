const request = require("supertest");

it("should return brand by id", async () => {
  await request(strapi.server) // app server is an instance of Class: http.Server
    .get("/brands/1")
    .expect(200) // Expect response http code 200
    .then((data) => {
      expect(data.body.name).toBe("Alaia"); // expect the response text
    });
});
