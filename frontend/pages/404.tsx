import Head from "next/head";
import React, { FC } from "react";
import { StyledHeader } from "../styles/layout";

const Page: FC = () => {
  return (
    <div>
      <Head>
        <title>404 BagBag</title>
        <meta property="og:description" content="Find your bag | BagBag" />
        <meta property="og:title" content="Find your bag | BagBag" />
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
