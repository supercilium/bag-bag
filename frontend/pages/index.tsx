import Head from "next/head";
import React, { FC } from "react";
import { Banner } from "../components/Banner";
import { getBrandsWithCounts, getCollections, getProducts } from "../utils/api";
import {
  Collections,
  NewArrivals,
  QualityAssurance,
  Sell,
} from "../components/content";
import { Subscribe } from "../components/content/Subscribe";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { ProductInterface } from "../types/product";
import { BrandWithCount } from "../types/brand";
import { CollectionInterface } from "../types/collection";
import { SSRConfig } from "next-i18next";

const HomePage: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  products,
  brandsWithCounts,
  collections,
}) => {
  return (
    <div>
      <Head>
        <title>(ex)bags</title>
      </Head>
      <Banner brandsWithCounts={brandsWithCounts} />
      <NewArrivals products={products} />
      <Collections items={collections} />
      <Sell />
      <QualityAssurance />
      <Subscribe />
    </div>
  );
};

interface HomePageInterface extends SSRConfig {
  products: ProductInterface[];
  brandsWithCounts: BrandWithCount[];
  collections: CollectionInterface[];
}

export const getStaticProps: GetStaticProps<HomePageInterface> = async ({
  locale,
}) => {
  const products = await getProducts();
  const collections = await getCollections({
    _limit: "3",
    _sort: "created_at:DESC",
  });
  const brandsWithCounts = await getBrandsWithCounts();
  const locales = await serverSideTranslations(locale, ["common", "footer"]);
  return {
    props: {
      products,
      brandsWithCounts,
      collections,
      ...locales,
    },
  };
};

export default HomePage;
