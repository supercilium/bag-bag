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
    position: relative;
  }
  a {
    text-decoration: none;
    appearance: none;
    color: ${({ theme }) => theme.colors.black};
    cursor: pointer;
  }
  i, em {
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
    text-transform: lowercase;
    cursor: pointer;
  }
  h1, .h1 {
    font-weight: 500;
    font-size: 48px;
    line-height: 89%;
    margin: 0;
    letter-spacing: -0.005em;
  }
  h2, .h2 {
    font-weight: 500;
    font-size: 4.8rem;
    line-height: 90%;
  }
  .h2 {
    margin: 0;
  }
  h3, .h3 {
    font-weight: 500;
    font-size: 45px;
    line-height: 95%;
  }
  h4, .h4 {
    font-weight: 500;
    font-size: 24px;
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

  .Toastify__toast {
    border-radius: 36px;
    font-size: 1.8rem;
    padding: 1.8rem;
  }

  .Toastify__toast--success {
    border: 1px solid ${({ theme }) => theme.colors.green};
    color: ${({ theme }) => theme.colors.green};
  }
  .Toastify__toast--error {
    border: 1px solid ${({ theme }) => theme.colors.red};
    color: ${({ theme }) => theme.colors.red};
  }
  .Toastify__toast-body {
    padding: 0;
    margin: 0;
  }

  .Toastify__close-button {
    align-self: center;
  }

  .banner {
    /* padding: 1.4rem; */
    display: flex;
    align-items: stretch;
    height: 100%;
  }

  .dot-list {
    display: none;
  }

  .item-class {
    width: calc(100vw - 8.8rem);
  }

  :focus-visible {
    outline: none;
  }

  .overflowXScroll {
    overflow-x: auto;
  }

  .layout-fixed {
    overflow: hidden;
    min-height: 100vh !important;
    height: 100vh;
  }

  @media ${device.laptopL} {
    h1, .h1 {
      font-size: 12.9rem;
      line-height: 89%;
    }
    h2, .h2 {
      font-size: 7.2rem;
      line-height: 90%;
    }
    html {
      font-size: 9px;
    }
    h4, .h4 {
      font-size: 2.4rem;
      line-height: 110%;
    }
    h3, .h3 {
      font-size: 4.8rem;
      line-height: 140%;
      letter-spacing: 0.03em;
    }
    .banner {
      border-right: 1px solid ${({ theme }) => theme.colors.black};
      width: calc(100vw - 8.8rem);
    }
    .dot-list {
      display: flex;
      width: 8.8rem;
      flex-shrink: 0;
      background-color: ${({ theme }) => theme.colors.white};
      top: 0;
      right: 0;
      bottom: 0;
      left: auto;
      flex-direction: column-reverse;
      justify-content: space-between;
      padding: 9rem 0;

      &:after {
        content: '';
        width: 1px;
        background-color: ${({ theme }) => theme.colors.black};
        position: absolute;
        right: 50%;
        top: 9rem;
        bottom: 9rem;
      }
    }


  }

  @media ${device.wide} {
    html {
      font-size: 10px;
    }
  }
`;
