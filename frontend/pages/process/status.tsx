import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useUser from "../../hooks/useUser";
import { StyledHeader } from "../../styles/layout";
import { updateOrder } from "../../utils/api";
import { toastSuccess } from "../../utils/toasts";

const Page = () => {
  const { query, push } = useRouter();
  const { user } = useUser({ redirectTo: "/404" });
  const { status, id } = query;

  useEffect(() => {
    if (user && id) {
      (async () => {
        const order = await updateOrder(id as string);
        console.log(order);
      })();
    }
  }, [user, id]);

  useEffect(() => {
    if (status === "success") {
      toastSuccess("Товар успешно оплачен. Ожидайте звонка менеджера.");
    }
  }, [status]);

  if (typeof window !== "undefined" && (!status || !id)) {
    push("/404");
  }

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
