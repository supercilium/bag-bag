import Head from "next/head";
import { StyledHeader } from "../../styles/layout";

const Page = () => {
  return (
    <div>
      <Head>
        <title>Контакты (ex)bags</title>
        <meta property="og:description" content="Контакты | (ex)bags" />
        <meta property="og:title" content="Контакты | (ex)bags" />
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
