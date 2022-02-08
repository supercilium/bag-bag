import Head from "next/head";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { Item } from "../../components/Item";
import { ProductInterface } from "../../types/product";
import { getProducts } from "../../utils/api";
import {
  CatalogueGrid,
  CatalogueItem,
  FiltersRow,
  SortBy,
} from "./Catalogue.styles";
import { GRID_TEMPLATES } from "./constants";

const Catalogue: FC<{ products: ProductInterface[] }> = ({ products }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading category...</div>;
  }

  return (
    <div>
      <Head>
        <title>Каталог (ex)bags</title>
      </Head>
      <div className="container">
        <div className="m32">
          <h1>каталог</h1>
          <FiltersRow>
            <div>Все</div>
            <div>тип</div>
            <div>бренд</div>
            <div>цена</div>
            <SortBy>
              <span>сортировать по:</span>
              популярности
            </SortBy>
          </FiltersRow>
          <CatalogueGrid>
            {products.map((item, i) => (
              <CatalogueItem key={item.id} $gridArea={GRID_TEMPLATES[i]}>
                <Item {...item} />
              </CatalogueItem>
            ))}
          </CatalogueGrid>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const products = await getProducts();
  return { props: { products } };
}

export default Catalogue;
