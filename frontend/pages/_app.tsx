import App, { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { SWRConfig } from "swr";
import { Layout } from "../components/Layout";
import { fetchJson, getFilters } from "../utils/api";
import "react-toastify/dist/ReactToastify.css";
import "../styles/index.css";
import { THEME } from "../styles/theme";
import { GlobalStyle } from "../styles/globalStyle";
import { ThemeProvider } from "styled-components";
import { appWithTranslation } from "next-i18next";
import { ToastContainer } from "react-toastify";

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
        <ToastContainer
          position="top-right"
          autoClose={8000}
          hideProgressBar={true}
          newestOnTop={false}
          draggable={false}
          icon={false}
        />

        <GlobalStyle />
        <Layout filters={pageProps.filters}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, maximum-scale=1.0"
            />
          </Head>
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
