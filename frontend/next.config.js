const { i18n } = require("./next-i18next.config");

module.exports = {
  i18n,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
