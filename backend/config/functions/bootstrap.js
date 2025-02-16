"use strict";

const fs = require("fs");

const {
  categories,
  products,
  brands,
  promotions,
  collections,
} = require("../../data/data");
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

  const promotionsPromises = promotions.map(async (promo) => {
    const banner = handleFiles({ slug: "dummy-promo" });

    const entry = await strapi.query("promotion").create(promo);
    await strapi.entityService.uploadFiles(
      entry,
      { banner },
      {
        model: "promotion",
      }
    );
  });

  const collectionsPromises = collections.map(async (collection) => {
    await strapi.query("collection").create(collection);
  });

  await Promise.all(categoriesPromises);
  await Promise.all(brandsPromises);
  await Promise.all(productsPromises);
  await Promise.all(promotionsPromises);
  await Promise.all(collectionsPromises);

  const brandsEntities = await strapi.query("brand").find();
  const preview = handleFiles({ slug: "dummy-brand" });
  if (preview) {
    await strapi.entityService.uploadFiles(
      brandsEntities[0],
      { preview },
      {
        model: "brand",
      }
    );
  }
  const knex = strapi.connections.default;
  const [previewImage] = await knex("upload_file")
    .where("name", "dummy-brand.png")
    .select("id");

  const updateBrandsPromises = brandsEntities.slice(1).map(async (entry) => {
    try {
      if (!previewImage?.id) {
        const preview = handleFiles({ slug: "dummy-brand" });
        console.log(preview);
        const files = {
          preview,
        };
        if (files) {
          await strapi.entityService.uploadFiles(entry, files, {
            model: "brand",
          });
        }
      } else {
        await knex
          .insert({
            upload_file_id: previewImage.id,
            related_id: entry.id,
            related_type: "brands",
            field: "preview",
            order: 1,
          })
          .into("upload_file_morph");
      }
    } catch (e) {
      console.log(e);
    }
  });

  await Promise.all(updateBrandsPromises);

  const categoriesEntities = await strapi.query("category").find();
  const categoryPreview = handleFiles({ slug: "dummy-category" });
  if (categoryPreview) {
    await strapi.entityService.uploadFiles(
      categoriesEntities[0],
      { preview: categoryPreview },
      {
        model: "category",
      }
    );
  }
  const [previewCategoryImage] = await knex("upload_file")
    .where("name", "dummy-category.png")
    .select("id");

  const updateCategoryPromises = categoriesEntities
    .slice(1)
    .map(async (entry) => {
      try {
        if (!previewCategoryImage?.id) {
          const preview = handleFiles({ slug: "dummy-category" });
          const files = {
            preview,
          };
          if (files) {
            await strapi.entityService.uploadFiles(entry, files, {
              model: "category",
            });
          }
        } else {
          await knex
            .insert({
              upload_file_id: previewCategoryImage.id,
              related_id: entry.id,
              related_type: "categories",
              field: "preview",
              order: 1,
            })
            .into("upload_file_morph");
        }
      } catch (e) {
        console.log(e);
      }
    });

  const updatedCollections = await strapi.query("collection").find();
  Promise.all(
    updatedCollections.map(async (item) => {
      await knex
        .insert({
          upload_file_id: previewCategoryImage.id,
          related_id: item.id,
          related_type: "collections",
          field: "preview",
          order: 1,
        })
        .into("upload_file_morph");
    })
  );

  await Promise.all(updateCategoryPromises);
};

// const updateProducts = async (files) => {
//   const handleFiles = (data) => {
//     var file = files.find((x) => x.includes(data.slug));
//     file = `./data/uploads/${file}`;

//     const size = getFilesizeInBytes(file);
//     const array = file.split(".");
//     const ext = array[array.length - 1];
//     const mimeType = `image/.${ext}`;
//     const image = {
//       path: file,
//       name: `${data.slug}.${ext}`,
//       size,
//       type: mimeType,
//     };
//     return image;
//   };

//   const productsPromises = products.map(async (product) => {
//     const images = handleFiles(product);

//     const files = {
//       images,
//     };

//     try {
//       const entry = await strapi.query("product").find({
//         id: product.id,
//       });

//       if (files) {
//         await strapi.entityService.uploadFiles(entry, files, {
//           model: "product",
//         });
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   });
//   await Promise.all(productsPromises);
// };

module.exports = async () => {
  const shouldSetDefaultPermissions = await isFirstRun();
  // const shouldSetDefaultPermissions = process.env.SHOULD_INITIATE || false;
  // const publicRole = await findRole("public");
  // const authenticated = await findRole("authenticated");

  // const public_permissions_applications = await getPermissions(publicRole.id);
  // writePermissionsToFile("../public.json", public_permissions_applications);
  // const permissions_applications = await getPermissions(authenticated.id);
  // writePermissionsToFile("../authenticated.json", permissions_applications);

  // try {
  //   const files = fs.readdirSync(`./data/uploads`);

  //   await updateProducts(files);
  //   console.log("added images");
  // } catch (err) {
  //   console.log(err);
  // }

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
