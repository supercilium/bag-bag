module.exports = ({ env }) => ({
  email: {
    provider: "nodemailer",
    providerOptions: {
      host: env("SMTP_HOST", ""),
      port: env("SMTP_PORT", 587),
      secure: env("SMTP_SECURE", false),
      auth: {
        user: env("SMTP_USERNAME"),
        pass: env("SMTP_PASSWORD"),
      },
    },
    settings: {
      defaultFrom: env("EMAIL_ADDRESS_FROM"),
      defaultReplyTo: env("EMAIL_ADDRESS_REPLY"),
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
