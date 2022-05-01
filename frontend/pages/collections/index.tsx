import { GetServerSideProps } from "next";
import Head from "next/head";
import { FC } from "react";
import { getCollections } from "../../utils/api";
import { StyledHeader } from "../../styles/layout";
import { CollectionInterface } from "../../types/collection";
import { CollectionItem } from "../../components/CollectionItem";
import { CollectionList } from "../../components/content/Collections/Collections.styles";
import { MainContent } from "../../styles/pages/Collection.styles";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Page: FC<{ collections: CollectionInterface[] }> = ({ collections }) => {
  return (
    <div>
      <Head>
        <title>Коллекции (ex)bags</title>
        <meta property="og:description" content="Коллекции | (ex)bags" />
        <meta property="og:title" content="Коллекции | (ex)bags" />
      </Head>
      <MainContent className="container m32">
        <StyledHeader>
          <h1>
            Коллекции <span>collections</span>
          </h1>
        </StyledHeader>

        <CollectionList>
          {collections?.map((item) => (
            <CollectionItem key={item.id} {...item} />
          ))}
        </CollectionList>
      </MainContent>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const collections = await getCollections(ctx.query);
  // const locales = await serverSideTranslations(ctx.locale, [
  //   "common",
  //   "footer",
  // ]);

  return { props: { collections } };
};

export default Page;
