import Head from "next/head";
import { StyledHeader } from "../../styles/layout";

const Page = () => {
  return (
    <div>
      <Head>
        <title>Контакты (ex)bags</title>
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
