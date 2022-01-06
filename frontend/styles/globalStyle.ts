import { createGlobalStyle } from "styled-components";
import { device } from "./constants";
import { Container } from "./layout";
import { subtitle } from "./typography";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    font-display: swap;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
  }
  a {
    text-decoration: none;
  }
  i {
    font-family: 'New York Extra Large', -apple-system-ui-serif, ui-serif, 'Georgia', serif;
    font-weight: 400;
  }
  html {
    font-family: 'Graphik LC', sans-serif;
    font-style: normal;
    font-size: 8px;
  }
  button {
    font-family: 'Graphik LC', sans-serif;
    font-style: normal;
  }
  h1, .h1 {
    font-weight: 500;
    font-size: 12.9rem;
    line-height: 89%;

    letter-spacing: -0.005em;
  }
  h2, .h2 {
    font-weight: 500;
    font-size: 7.2rem;
    line-height: 90%;
  }
  h3, .h3 {
    font-weight: 500;
    font-size: 4.8rem;
    line-height: 140%;
    letter-spacing: 0.03em;
  }
  h4, .h4 {
    font-weight: 500;
    font-size: 2.4rem;
    line-height: 110%;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }
  .subtitle {
    ${subtitle}
  }
  .align-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .flex-grow {
    flex-grow: 1;
  }
  .primary-text {
    font-weight: normal;
    font-size: 1.8rem;
    line-height: 150%;
  }
  .left-arrow {
    transform: rotate(180deg);
  }
  .container {
    ${Container}
  }
  .image {
    background: linear-gradient(0deg, rgba(167, 213, 239, 0.06), rgba(167, 213, 239, 0.06));
    background-blend-mode: color, normal;
    border-radius: 60px;
  }
  .m32 {
    padding-left: 3.2rem;
    padding-right: 3.2rem;
  }
  
  @media screen and ${device.wide} {
    html {
      font-size: 10px;
    }
  }
`;
