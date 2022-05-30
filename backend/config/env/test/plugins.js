module.exports = () => ({
  email: {
    provider: "mock",
    providerOptions: {},
    settings: {
      // If set to false, each email sent will be logged to console
      quiet: false,
      defaultFrom: "strapi@example.com",
      defaultReplyTo: "strapi@example.com",
    },
  },
  upload: {
    provider: "local",
    providerOptions: {
      localServer: {
        maxAge: 31536000000,
      },
    },
  },
});
