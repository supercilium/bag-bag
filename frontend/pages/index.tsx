import Head from "next/head";
import React, { FC } from "react";
import { Banner } from "../components/Banner";
import { getBrandsWithCounts, getProducts } from "../utils/api";
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

const HomePage: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  products,
  brandsWithCounts,
}) => {
  return (
    <div>
      <Head>
        <title>(ex)bags</title>
      </Head>
      <Banner brandsWithCounts={brandsWithCounts} />
      <NewArrivals products={products} />
      <Collections />
      <Sell />
      <QualityAssurance />
      <Subscribe />
    </div>
  );
};

export const getStaticProps: GetStaticProps<{
  products: ProductInterface[];
  brandsWithCounts: BrandWithCount[];
}> = async ({ locale }) => {
  const products = await getProducts();
  const brandsWithCounts = await getBrandsWithCounts();
  const locales = await serverSideTranslations(locale, ["common", "footer"]);
  return {
    props: {
      products,
      brandsWithCounts,
      ...locales,
    },
  };
};

export default HomePage;
