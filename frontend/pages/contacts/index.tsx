import Head from "next/head";
import { StyledHeader } from "../../styles/layout";

const Page = () => {
  return (
    <div>
      <Head>
        <title>Контакты BagBag</title>
        <meta property="og:description" content="Контакты | BagBag" />
        <meta property="og:title" content="Контакты | BagBag" />
      </Head>
      <div className="container m32">
        <StyledHeader>
          <h1>Контакты</h1>
        </StyledHeader>
      </div>
    </div>
  );
};

export default Page;
