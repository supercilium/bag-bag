"use strict";

const fs = require("fs");

const findRole = async (type) => {
  const result = await strapi.query("role", "users-permissions").findOne({
    type,
  });
  return result;
};

const getPermissions = async (role) => {
  const data = await strapi.query("permission", "users-permissions").find({
    type: "application",
    role,
  });
  return data?.map(({ id, type, controller, action, enabled }) => ({
    id,
    type,
    controller,
    action,
    enabled,
  }));
};

const writePermissionsToFile = (file, data) => {
  fs.writeFile(file, JSON.stringify(data), (err) => {
    if (err) {
      console.error(err);
    }
    console.log(`${file} wrote`);
  });
};

module.exports = {
  writePermissionsToFile,
  getPermissions,
  findRole,
};
