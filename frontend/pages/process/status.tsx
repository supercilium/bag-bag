import Head from "next/head";
import { useRouter } from "next/router";
import { StyledHeader } from "../../styles/layout";

const Page = () => {
  const { query } = useRouter();
  console.log(query);
  const { status, id } = query;
  return (
    <div>
      <Head>
        <title>{`${
          status === "success" ? "Заказ успешно оплачен" : "Ошибка оплаты"
        } | (ex)bags`}</title>
        <meta
          property="og:description"
          content={`${
            status === "success" ? "Заказ успешно оплачен" : "Ошибка оплаты"
          } | (ex)bags`}
        />
        <meta
          property="og:title"
          content={`${
            status === "success" ? "Заказ успешно оплачен" : "Ошибка оплаты"
          } | (ex)bags`}
        />
      </Head>
      <div className="container m32">
        <StyledHeader>
          <h1>
            {status === "success"
              ? `Заказ №${id} успешно оплачен`
              : `При оплате заказа №${id} произошла ошибка`}
          </h1>
        </StyledHeader>
      </div>
    </div>
  );
};

export default Page;
