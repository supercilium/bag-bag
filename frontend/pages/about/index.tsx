import Head from "next/head";
import { StyledHeader } from "../../styles/layout";

const About = () => {
  return (
    <div>
      <Head>
        <title>О нас (ex)bags</title>
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
