import App, { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { SWRConfig } from "swr";
import { Layout } from "../components/Layout";
import { fetchJson, getFilters } from "../utils/api";
import "../styles/index.css";
import { THEME } from "../styles/theme";
import { GlobalStyle } from "../styles/globalStyle";
import { ThemeProvider } from "styled-components";
import { appWithTranslation } from "next-i18next";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={THEME}>
      <SWRConfig
        value={{
          fetcher: fetchJson,
          onError: (err) => {
            console.error(err);
          },
        }}
      >
        <GlobalStyle />
        <Layout filters={pageProps.filters}>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </ThemeProvider>
  );
};

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So [[...slug]] pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx: AppContext) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);
  // Fetch global site settings from Strapi
  const filters = await getFilters();
  // Pass the data to our page via props
  return {
    ...appProps,
    pageProps: { filters, path: ctx.ctx.pathname },
  };
};

export default appWithTranslation(MyApp);
