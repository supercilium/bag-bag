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
    provider: "aws-s3",
    providerOptions: {
      accessKeyId: env("AWS_ACCESS_KEY"),
      secretAccessKey: env("AWS_SECRET_KEY"),
      region: env("AWS_REGION"),
      params: {
        Bucket: env("AWS_BUCKET"),
      },
    },
  },
});
