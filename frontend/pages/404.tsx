import Head from "next/head";
import React, { FC } from "react";
import { StyledHeader } from "../styles/layout";

const Page: FC = () => {
  return (
    <div>
      <Head>
        <title>404 (ex)bags</title>
        <meta property="og:description" content="Ресейл сумок | (ex)bags" />
        <meta property="og:title" content="Ресейл сумок | (ex)bags" />
      </Head>
      <div className="container m32">
        <StyledHeader>
          <h1>Страница не найдена</h1>
        </StyledHeader>
      </div>
    </div>
  );
};

export default Page;
