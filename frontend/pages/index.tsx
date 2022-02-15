import Head from "next/head";
import React from "react";
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

const HomePage = ({ products, brandsWithCounts }) => {
  return (
    <div>
      <Head>
        <title>(ex)bags</title>
      </Head>
      <Banner />
      <NewArrivals products={products} />
      <Collections />
      <Sell />
      <QualityAssurance />
      <Subscribe />
    </div>
  );
};

export async function getStaticProps({ locale }) {
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
}

export default HomePage;
