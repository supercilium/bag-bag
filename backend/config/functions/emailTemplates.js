// const { makeHTML } = require("./emailTemplateHTML");

const mapStatusToDescription = {
  new: "Ожидает оплаты",
  paid: "Оплачен",
  processing: "Готовится к отправке",
  pending_issuance: "Ожидает выдачи",
  delivering: "Выдан курьеру",
  return: "Возврат",
  cancelled: "Отменен",
  done: "Выполнен",
};

/**
 *
 * @param {string} email - user email
 * @returns
 */
const getSubscriberGreetingEmail = (email) => {
  return {
    from:
      `${process.env.COMPANY_NAME} ${process.env.EMAIL_ADDRESS_FROM}` ||
      `${process.env.COMPANY_NAME} <${process.env.EMAIL_ADDRESS_FROM}>`,
    bcc: process.env.EMAIL_ADDRESS_FROM,
    subject: `Благодарим за подписку | ${process.env.COMPANY_NAME}`,
    text: `@${email}, добро пожаловать в клуб ${process.env.COMPANY_NAME}`,
  };
};

/**
 *
 * @param {string} email - user email
 * @param {string} orderId - if of order
 * @param {number} total - amount of order
 * @returns
 */
const getOrderCreationEmail = (email, orderId, total) => {
  return {
    to: email,
    from:
      `${process.env.COMPANY_NAME} ${process.env.EMAIL_ADDRESS_FROM}` ||
      `${process.env.COMPANY_NAME} <${process.env.EMAIL_ADDRESS_FROM}>`,
    bcc: process.env.EMAIL_ADDRESS_FROM,
    subject: `Ваш заказ #${orderId} | ${process.env.COMPANY_NAME}`,
    text: `Ваш заказ #${orderId} на сумму ${total} создан.`,
  };
};

/**
 *
 * @param {string} email - user email
 * @param {string} orderId - user email
 * @param {string} status - order status
 * @returns
 */
const getOrderChangedStatusEmail = (email, orderId, status) => {
  return {
    to: email,
    from:
      `${process.env.COMPANY_NAME} ${process.env.EMAIL_ADDRESS_FROM}` ||
      `${process.env.COMPANY_NAME} <${process.env.EMAIL_ADDRESS_FROM}>`,
    bcc: process.env.EMAIL_ADDRESS_FROM,
    subject: `Заказ #${orderId} ${mapStatusToDescription[status]} | ${process.env.COMPANY_NAME}`,
    text: `Ваш заказ #${orderId} ${mapStatusToDescription[status]}.`,
  };
};

/**
 *
 * @param {string} email - sellers email
 * @param {string} requestId - id of request
 * @param {string} name - sellers name
 * @param {string} phone - sellers phone
 * @returns
 */
const getRequestCreationEmail = (email, requestId, name, phone) => {
  return {
    to: process.env.MANAGERS_EMAIL,
    from:
      `${process.env.COMPANY_NAME} ${process.env.EMAIL_ADDRESS_FROM}` ||
      `${process.env.COMPANY_NAME} <${process.env.EMAIL_ADDRESS_FROM}>`,
    bcc: process.env.EMAIL_ADDRESS_FROM,
    subject: `Новая заявка на продажу #${requestId} | ${process.env.COMPANY_NAME}`,
    text: `Поступила новая заявка на продажу сумки #${requestId} от ${name} e-mail: ${email}, номер телефона ${phone}.
      Посмотреть детали заявки можно по ссылке ${process.env.MY_HEROKU_URL}/admin/plugins/content-manager/collectionType/application::request.request/${requestId}`,
  };
};

module.exports = {
  getSubscriberGreetingEmail,
  getOrderCreationEmail,
  getOrderChangedStatusEmail,
  getRequestCreationEmail,
};
