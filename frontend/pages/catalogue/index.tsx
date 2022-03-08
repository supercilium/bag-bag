import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC } from "react";
import { Item } from "../../components/Item";
import { Filters } from "../../types/common";
import { ProductInterface } from "../../types/product";
import { getProducts } from "../../utils/api";
import {
  CatalogueGrid,
  CatalogueItem,
} from "../../styles/pages/Catalogue.styles";
import { GRID_TEMPLATES } from "../../constants/catalogueGridTemplate";
import { StyledHeader } from "../../styles/layout";
import { FiltersMenu } from "../../components/Filters";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Catalogue: FC<{ products: ProductInterface[]; filters: Filters }> = ({
  products,
  filters,
}) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <div>Loading category...</div>;
  }

  return (
    <div>
      <Head>
        <title>Каталог (ex)bags</title>
      </Head>
      <div className="container m32">
        <StyledHeader>
          <h1>
            каталог <span>catalog</span>
          </h1>
        </StyledHeader>

        <FiltersMenu filters={filters} />
        <CatalogueGrid>
          {products.map((item, i) => (
            <CatalogueItem key={item.id} $gridArea={GRID_TEMPLATES[i]}>
              <Item {...item} />
            </CatalogueItem>
          ))}
        </CatalogueGrid>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const products = await getProducts(ctx.query);
  const locales = await serverSideTranslations(ctx.locale, [
    "common",
    "footer",
  ]);

  return { props: { products, ...locales } };
};

export default Catalogue;
