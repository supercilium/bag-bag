import Head from "next/head";
import React, { FC } from "react";
import {
  getBrandsWithCounts,
  getCollections,
  getProducts,
  getPromotions,
} from "../utils/api";
import {
  Collections,
  NewArrivals,
  QualityAssurance,
  Sell,
  Banner,
} from "../components/content";
import { Subscribe } from "../components/content/Subscribe";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { ProductInterface } from "../types/product";
// import { BrandWithCount } from "../types/brand";
import { CollectionInterface } from "../types/collection";
// import { SSRConfig } from "next-i18next";
import { PromotionInterface } from "../types/promotion";
import "react-multi-carousel/lib/styles.css";

const HomePage: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  products,
  collections,
  promotions,
}) => {
  return (
    <div>
      <Head>
        <title>Ресейл (ex)bags</title>
        <meta property="og:description" content="Ресейл сумок | (ex)bags" />
        <meta property="og:title" content="Ресейл сумок | (ex)bags" />
      </Head>
      <Banner promotions={promotions} />
      <NewArrivals products={products} />
      <Collections items={collections} />
      <Sell />
      <QualityAssurance />
      <Subscribe />
    </div>
  );
};

// interface HomePageInterface extends SSRConfig {
interface HomePageInterface {
  products: ProductInterface[];
  collections: CollectionInterface[];
  promotions: PromotionInterface[];
}

export const getStaticProps: GetStaticProps<HomePageInterface> = async ({
  locale,
}) => {
  const products = await getProducts({
    _limit: "8",
    _sort: "created_at:DESC",
  });
  const collections = await getCollections({
    _limit: "3",
    _sort: "created_at:DESC",
  });
  const promotions = await getPromotions({
    _limit: "4",
    _sort: "created_at:DESC",
  });
  // const locales = await serverSideTranslations(locale, [
  // "common", "footer"
  // ]);
  return {
    props: {
      products,
      collections,
      promotions,
      // ...locales,
    },
  };
};

export default HomePage;
