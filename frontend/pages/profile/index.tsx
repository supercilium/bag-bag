import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Input } from "../../components/Input";
import Info from "../../components/icons/info.svg";
import Order from "../../components/icons/order.svg";
import Like from "../../components/icons/like.svg";
import {
  CommentaryRow,
  DetailsButton,
  InfoTab,
  OrderDetails,
  OrderRow,
  PreviousPrice,
  ProfileRoot,
  StatusHighlight,
  Tab,
  Tabs,
  TitleRow,
} from "../../styles/pages/Profile.styles";
import { FavoriteItem } from "../../components/FavoriteItem";
import { InfoBlock } from "../../components/InfoBlock";
import { Box, LaptopLVisible, StyledHeader } from "../../styles/layout";
import { User } from "../../types/user";
import { useForm } from "react-hook-form";
import useUser from "../../hooks/useUser";
import { destroyCookie } from "nookies";
import { ORDER_DESCRIPTIONS, SHIPPING_METHODS } from "../../constants/order";
import { formatDate, formatSum } from "../../utils/formatters";
import { getStatusColor } from "../../utils/profile";
import { ButtonText } from "../../components/ButtonText";
import Arrow from "../../components/icons/arrow-simple-right.svg";
import Quit from "../../components/icons/quit.svg";
import { Icon } from "../../components/InfoBlock/InfoBlock.styles";
import { InfoBlockMobile } from "../../components/InfoBlockMobile";

export type ActiveTab = "info" | "orders" | "favorite";

const Profile = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("info");
  const router = useRouter();
  const { user, mutateUser } = useUser({
    redirectTo: "/login",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    unregister,
    getValues,
    setError,
  } = useForm<User & { password?: string }>({
    shouldFocusError: false,
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      address: user?.address,
    },
  });
  if (!user) {
    return <div>Loading...</div>;
  }
  if (router.isFallback) {
    return <div>Loading category...</div>;
  }

  const onLogout = async () => {
    destroyCookie(null, "token");
    await mutateUser(null, false);
  };

  return (
    <div>
      <Head>
        <title>Профиль (ex)bags</title>
      </Head>
      <div className="container m32">
        <StyledHeader $buttonPosition="right">
          <h1>мой аккаунт</h1>
          <ButtonText onClick={onLogout}>
            <Quit /> Выйти
          </ButtonText>
        </StyledHeader>
        <ProfileRoot>
          <Tabs>
            <Tab
              $active={activeTab === "info"}
              onClick={() => setActiveTab("info")}
            >
              <Info width="36" height="36" />
              информация
              <Icon $isOpen={activeTab === "info"}>
                <Arrow />
              </Icon>
            </Tab>
            {activeTab === "info" && (
              <InfoTab>
                <Input
                  label="Имя фамилия"
                  {...register("name", { required: "Name is required" })}
                  error={errors?.name?.message}
                />
                <Input
                  label="эл. почта"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "invalid email address",
                    },
                  })}
                  error={errors?.email?.message}
                />
                <Input
                  label="Телефон"
                  placeholder="+7 _____ ____-__-__"
                  {...register("phone", { required: "Name is required" })}
                  error={errors?.phone?.message}
                />
                <Input
                  label="пароль"
                  placeholder="........"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  error={errors?.password?.message}
                />
                <Input label="адрес" />
                <Input />
                <Input placeholder="+7 _____ ____-__-__" />
              </InfoTab>
            )}
            <hr />

            <Tab
              $active={activeTab === "orders"}
              onClick={() => setActiveTab("orders")}
            >
              <Order width="36" height="36" /> заказы
              <Icon $isOpen={activeTab === "orders"}>
                <Arrow />
              </Icon>
            </Tab>
            {activeTab === "orders" && (
              <InfoTab>
                {user?.orders?.length > 0 &&
                  user?.orders.map((order) => (
                    <InfoBlockMobile
                      key={order.id}
                      title={
                        <OrderRow>
                          <div>{order.id}</div>
                          <div>{formatDate(order.created_at)}</div>
                        </OrderRow>
                      }
                      content={
                        <OrderDetails>
                          <div>Доставка</div>
                          <div>{`${
                            SHIPPING_METHODS[order.shippingMethod]
                          } – ${formatSum(
                            order.delivery_cost || 0,
                            "₽"
                          )}`}</div>
                          <div>Сумма</div>
                          <div>{formatSum(order.total, "₽")}</div>
                          <div>Статус</div>
                          <StatusHighlight
                            highlight={getStatusColor(order.status)}
                          >
                            {ORDER_DESCRIPTIONS[order.status]}
                          </StatusHighlight>
                          <CommentaryRow>
                            15.01.2021 - 15:00 доставлен по адресу:г.Москва,
                            ул.Королева 20 к1, 20 кв.
                          </CommentaryRow>
                        </OrderDetails>
                      }
                    />
                  ))}
              </InfoTab>
            )}
            <hr />
            <Tab
              $active={activeTab === "favorite"}
              onClick={() => setActiveTab("favorite")}
            >
              <Like width="36" height="36" />
              избранное
              <Icon $isOpen={activeTab === "favorite"}>
                <Arrow />
              </Icon>
            </Tab>
            {activeTab === "favorite" && (
              <InfoTab>
                {user?.favorites?.length > 0 &&
                  user?.favorites?.map((item) => (
                    <FavoriteItem key={item.id} {...item} />
                  ))}
              </InfoTab>
            )}
            <hr />
          </Tabs>
          <LaptopLVisible>
            {activeTab === "info" && (
              <InfoTab>
                <Box>
                  <Input
                    label="Имя фамилия"
                    {...register("name", { required: "Name is required" })}
                    error={errors?.name?.message}
                  />
                  <Input
                    label="эл. почта"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "invalid email address",
                      },
                    })}
                    error={errors?.email?.message}
                  />
                  <Input
                    label="Телефон"
                    placeholder="+7 _____ ____-__-__"
                    {...register("phone", { required: "Name is required" })}
                    error={errors?.phone?.message}
                  />
                  <Input
                    label="пароль"
                    placeholder="........"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    error={errors?.password?.message}
                  />
                </Box>
                <Box>
                  <Input label="адрес" />
                  <Input />
                  <Input placeholder="+7 _____ ____-__-__" />
                </Box>
              </InfoTab>
            )}
            {activeTab === "orders" && (
              <Box>
                <h4 className="subtitle">мои заказы</h4>
                <TitleRow>
                  <div>№</div>
                  <div>Дата</div>
                  <div>Способ доставки</div>
                  <div>Сумма</div>
                  <div>Статус</div>
                  <div />
                </TitleRow>
                {user?.orders?.length > 0 &&
                  user?.orders.map((order) => (
                    <InfoBlock
                      key={order.id}
                      title={
                        <OrderRow>
                          <div>{order.id}</div>
                          <div>{formatDate(order.created_at)}</div>
                          <div>{SHIPPING_METHODS[order.shippingMethod]}</div>
                          <div>{formatSum(order.total, "₽")}</div>
                          <StatusHighlight
                            highlight={getStatusColor(order.status)}
                          >
                            {ORDER_DESCRIPTIONS[order.status]}
                          </StatusHighlight>
                          <DetailsButton>Подробнее</DetailsButton>
                        </OrderRow>
                      }
                      content={
                        <OrderDetails>
                          <div>{formatSum(order.delivery_cost || 0, "₽")}</div>
                          {order.discount ? (
                            <PreviousPrice>
                              {formatSum(order.total + order.discount, "₽")}
                            </PreviousPrice>
                          ) : (
                            <div />
                          )}
                          <div>
                            15.01.2021 - 15:00 доставлен по адресу:г.Москва,
                            ул.Королева 20 к1, 20 кв.
                          </div>
                        </OrderDetails>
                      }
                    />
                  ))}
              </Box>
            )}
            {activeTab === "favorite" && (
              <InfoTab>
                {user?.favorites?.length > 0 &&
                  user?.favorites?.map((item) => (
                    <FavoriteItem key={item.id} {...item} />
                  ))}
              </InfoTab>
            )}
          </LaptopLVisible>
        </ProfileRoot>
      </div>
    </div>
  );
};

export default Profile;
