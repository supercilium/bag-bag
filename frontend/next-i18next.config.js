const HttpBackend = require("i18next-http-backend/cjs");
const ChainedBackend = require("i18next-chained-backend").default;
const LocalStorageBackend = require("i18next-localstorage-backend").default;

module.exports = {
  backend: {
    backendOptions: [
      { expirationTime: 60 * 60 * 1000 },
      {
        /* loadPath: 'https:// somewhere else' */
      },
    ], // 1 hour
    backends:
      typeof window !== "undefined" ? [LocalStorageBackend, HttpBackend] : [],
  },
  // debug: true,
  i18n: {
    defaultLocale: "ru",
    locales: ["en", "ru"],
  },
  serializeConfig: false,
  use: typeof window !== "undefined" ? [ChainedBackend] : [],
};
