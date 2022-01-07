import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Item } from "../../components/Item";
import {
  CatalogueGrid,
  CatalogueItem,
  FiltersRow,
  SortBy,
} from "./Catalogue.styles";
import { GRID_TEMPLATES } from "./constants";

const Catalogue = () => {
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
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item, i) => (
              <CatalogueItem $gridArea={GRID_TEMPLATES[i]}>
                <Item key={item} />
              </CatalogueItem>
            ))}
          </CatalogueGrid>
        </div>
      </div>
    </div>
  );
};

export default Catalogue;
