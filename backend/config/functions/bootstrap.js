"use strict";

const fs = require("fs");

const { categories, products, brands } = require("../../data/data");
const {
  public: publicPermissions,
  authenticated: authenticatedPermissions,
} = require("../../data/permissions");
const {
  findRole,
  getPermissions,
  // writePermissionsToFile,
} = require("./createPermissionsSnapshot");

const setDefaultPermissions = async () => {
  const authenticated_role = await findRole("authenticated");

  const authenticated_permissions_applications = await getPermissions(
    authenticated_role.id
  );
  const public_role = await findRole("public");
  const public_permissions_applications = await getPermissions(public_role.id);

  await Promise.all(
    public_permissions_applications.map((p) =>
      strapi.query("permission", "users-permissions").update(
        {
          id: p.id,
        },
        {
          enabled:
            publicPermissions.find(
              ({ controller, action }) =>
                p.controller === controller && p.action === action
            )?.enabled || false,
        }
      )
    )
  );
  await Promise.all(
    authenticated_permissions_applications.map((p) =>
      strapi.query("permission", "users-permissions").update(
        {
          id: p.id,
        },
        {
          enabled:
            authenticatedPermissions.find(
              ({ controller, action }) =>
                p.controller === controller && p.action === action
            )?.enabled || false,
        }
      )
    )
  );
};

const isFirstRun = async () => {
  const pluginStore = strapi.store({
    environment: strapi.config.environment,
    type: "type",
    name: "setup",
  });
  const initHasRun = await pluginStore.get({
    key: "initHasRun",
  });
  await pluginStore.set({
    key: "initHasRun",
    value: true,
  });
  return !initHasRun;
};

const getFilesizeInBytes = (filepath) => {
  var stats = fs.statSync(filepath);
  var fileSizeInBytes = stats["size"];
  return fileSizeInBytes;
};

const createSeedData = async (files) => {
  const handleFiles = (data) => {
    var file = files.find((x) => x.includes(data.slug));
    file = `./data/uploads/${file}`;

    const size = getFilesizeInBytes(file);
    const array = file.split(".");
    const ext = array[array.length - 1];
    const mimeType = `image/.${ext}`;
    const image = {
      path: file,
      name: `${data.slug}.${ext}`,
      size,
      type: mimeType,
    };
    return image;
  };

  const categoriesPromises = categories.map(({ ...rest }) => {
    return strapi.services.category.create({
      ...rest,
    });
  });

  const brandsPromises = brands.map(({ ...rest }) => {
    return strapi.services.brand.create({
      ...rest,
    });
  });

  const productsPromises = products.map(async (product) => {
    const images = handleFiles(product);

    const files = {
      images,
    };

    try {
      const entry = await strapi.query("product").create(product);

      if (files) {
        await strapi.entityService.uploadFiles(entry, files, {
          model: "product",
        });
      }
    } catch (e) {
      console.log(e);
    }
  });

  await Promise.all(categoriesPromises);
  await Promise.all(brandsPromises);
  await Promise.all(productsPromises);
};

module.exports = async () => {
  const shouldSetDefaultPermissions = await isFirstRun();
  // const publicRole = await findRole("public");
  // const authenticated = await findRole("authenticated");

  // const public_permissions_applications = await getPermissions(publicRole.id);
  // writePermissionsToFile("../public.json", public_permissions_applications);
  // const permissions_applications = await getPermissions(authenticated.id);
  // writePermissionsToFile("../authenticated.json", permissions_applications);

  if (shouldSetDefaultPermissions) {
    try {
      console.log("Setting up your starter...");
      const knex = strapi.connections.default;

      await knex.schema.table("products_users__users_favorites", function (t) {
        t.unique(["user_id", "product_id"]);
      });
      await knex.schema.table(
        "components_shopping_bag_shopping_bags__products",
        function (t) {
          t.unique(["components_shopping_bag_shopping_bag_id", "product_id"]);
        }
      );
      const files = fs.readdirSync(`./data/uploads`);
      await setDefaultPermissions();
      await createSeedData(files);
      console.log("Ready to go");
    } catch (e) {
      console.log(e);
    }
  }
};
