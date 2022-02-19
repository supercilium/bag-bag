module.exports = ({ env }) => ({
  url: env("MY_HEROKU_URL"),
  // host: env("HOST", "0.0.0.0"),
  // port: env.int("PORT", 1337),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "92d77bf716476fc4b0818ebd5bd888db"),
    },
  },
});
