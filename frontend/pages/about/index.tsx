import Head from "next/head";
import { StyledHeader } from "../../styles/layout";

const About = () => {
  return (
    <div>
      <Head>
        <title>О нас (ex)bags</title>
        <meta property="og:description" content="О нас | (ex)bags" />
        <meta property="og:title" content="О нас | (ex)bags" />
      </Head>
      <div className="container m32">
        <StyledHeader>
          <h1>О нас</h1>
        </StyledHeader>
      </div>
    </div>
  );
};

export default About;
