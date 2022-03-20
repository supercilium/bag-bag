import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { getPromotions } from "../../utils/api";
import { StyledHeader } from "../../styles/layout";
import { PromotionInterface } from "../../types/promotion";
import {
  CatalogueGrid,
  CatalogueItem,
} from "../../styles/pages/Catalogue.styles";
import { GRID_TEMPLATES } from "../../constants/catalogueGridTemplate";
import { Item } from "../../components/Item";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Page: FC<{ promotions: PromotionInterface[] }> = ({ promotions }) => {
  const { isFallback, query } = useRouter();
  console.log(promotions);

  useEffect(() => {
    if (window && query) {
      const { slug } = query;
      const elem = document.getElementById(slug as string);
      const topMenu = document.getElementById("top-menu");
      window.scrollTo({
        top:
          elem?.getBoundingClientRect().top -
          topMenu.getBoundingClientRect().height,
        behavior: "smooth",
      });
    }
  }, [query]);

  if (isFallback) {
    return <div>Loading category...</div>;
  }

  return (
    <div>
      <Head>
        <title>Акции (ex)bags</title>
      </Head>
      <div className="container m32">
        {promotions?.map((item) => (
          <div key={item.id} id={item.slug}>
            <StyledHeader>
              <h2>{item.name}</h2>
            </StyledHeader>
            <CatalogueGrid>
              {item?.products &&
                item.products.map((product, i) => (
                  <CatalogueItem key={product.id} $gridArea={GRID_TEMPLATES[i]}>
                    <Item {...product} />
                  </CatalogueItem>
                ))}
            </CatalogueGrid>
          </div>
        ))}
      </div>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const promotions = await getPromotions(ctx.query);
  // const locales = await serverSideTranslations(ctx.locale, [
  //   "common",
  //   "footer",
  // ]);

  return { props: { promotions } };
};

export default Page;
