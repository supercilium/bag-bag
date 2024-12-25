import Head from "next/head";
import { FC } from "react";
import { Item } from "../../components/Item";
import { getCollection, getCollections } from "../../utils/api";
import {
  CatalogueGrid,
  CatalogueItem,
} from "../../styles/pages/Catalogue.styles";
import { GRID_TEMPLATES } from "../../constants/catalogueGridTemplate";
import { StyledHeader } from "../../styles/layout";
import { CollectionInterface } from "../../types/collection";

const Page: FC<{ collection: CollectionInterface }> = ({ collection }) => {
  return (
    <div>
      <Head>
        <title>Коллекция BagBag</title>
        <meta
          property="og:image"
          content={collection?.preview?.formats?.thumbnail?.url}
        />
        <meta property="og:description" content={collection.description} />
        <meta
          property="og:title"
          content={`${collection.name} | ex(Bag) Online Store`}
        />
      </Head>
      <div className="container m32">
        <StyledHeader>
          <h1>
            {collection?.name} <span>collection</span>
          </h1>
        </StyledHeader>

        <CatalogueGrid>
          {collection?.products.map((item, i) => (
            <CatalogueItem key={item.id} $gridArea={GRID_TEMPLATES[i]}>
              <Item {...item} />
            </CatalogueItem>
          ))}
        </CatalogueGrid>
      </div>
    </div>
  );
};

export default Page;

export async function getStaticProps({ params }) {
  try {
    const collection = await getCollection(params.slug);
    return { props: { collection } };
  } catch (error) {
    return {
      props: {
        error: "error",
      },
    };
  }
}

export async function getStaticPaths() {
  const items = await getCollections();
  return {
    paths: (items as CollectionInterface[]).map((item) => {
      return {
        params: { slug: item.slug },
      };
    }),
    fallback: true,
  };
}
