const { makeHTML } = require("./emailTemplateHTML");
/**
 *
 * @param {string} email - user email
 * @returns
 */
const getSubscriberGreetingEmail = (email) => {
  return {
    to: email,
    // bcc: process.env.EMAIL_ADDRESS_FROM,
    from:
      `(Ex)Bags ${process.env.EMAIL_ADDRESS_FROM}` ||
      "(Ex)Bags <lovedbag@bagbag.guru>",
    subject: "Subscription | (Ex)Bags",
    text: `Hey @${email}, Thanks for subscribing to our NewsLetter`,
    // html: makeHTML({
    //   title: "Welcome to Lovedbag!",
    //   buttonTitle: "Visit out store",
    //   buttonUrl: process.env.FRONTEND_URL,
    // }),
  };
};

/**
 *
 * @param {string} email - user email
 * @param {string} orderId - user email
 * @returns
 */
const getOrderCreationEmail = (email, orderId) => {
  return {
    to: email,
    from:
      `Lovedbag ${process.env.EMAIL_ADDRESS_FROM}` ||
      "Lovedbag <lovedbag@bagbag.guru>",
    bcc: process.env.EMAIL_ADDRESS_FROM,
    subject: `Order #${orderId} | LovedBag`,
    text: `Your order has been successfully paid and accepted for processing
    Your order has been successfully paid
    Your order has been successfully paid and accepted for processing.
    We will pass the order on to the delivery service and provide a shipping number in the near future.
    Thank you for your purchase.`,
    // html: `<h2>Hey, Thanks for purchase in Lovedbag store!</h2>
    // <p>We've got your order #${orderId}. You'll receive shipping info soon.</p>
    // <p>Information about order and its' status can be found in profile ${process.env.FRONTEND_URL}/profile
    // Sincerely, Lovedbag store</p>`,
    html: makeHTML({
      title: `Your order has been successfully paid and accepted for processing`,
      text: "Your order has been successfully paid\nYour order has been successfully paid and accepted for processing.\nWe will pass the order on to the delivery service and provide a shipping number in the near future.\nThank you for your purchase.",
    }),
  };
};

/**
 *
 * @param {string} email - user email
 * @param {string} orderId - user email
 * @param {string} shippingId - user email
 * @returns
 */
const getOrderShippingEmail = (email, orderId, shippingId) => {
  return {
    to: email,
    from:
      `Lovedbag ${process.env.EMAIL_ADDRESS_FROM}` ||
      "Lovedbag <lovedbag@bagbag.guru>",
    bcc: process.env.EMAIL_ADDRESS_FROM,
    subject: `Order #${orderId} | LovedBag`,
    text: `Hello @${email}, your order is delivering
    Shipping order number ${shippingId}, you can check your shipping status on DHL website.
    Sincerely, Lovedbag store`,
    html: `<h2>Hello @${email}, your order is delivering</h2>
    <p>Shipping order number ${shippingId}, you can check your shipping status on DHL website.
    Sincerely, Lovedbag store</p>`,
  };
};

module.exports = {
  getSubscriberGreetingEmail,
  getOrderCreationEmail,
  getOrderShippingEmail,
};
