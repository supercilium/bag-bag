import Head from "next/head";
import { useState } from "react";
import { Input } from "../../components/Input";
import Info from "../../components/icons/info.svg";
import Order from "../../components/icons/order.svg";
import Like from "../../components/icons/like.svg";
import {
  CommentaryRow,
  DetailsButton,
  InfoTab,
  NoOrders,
  OrderDetails,
  OrderRow,
  PreviousPrice,
  ProfileRoot,
  StatusHighlight,
  StyledProfileHeader,
  Tab,
  Tabs,
  TitleRow,
} from "../../styles/pages/Profile.styles";
import { FavoriteItem } from "../../components/FavoriteItem";
import { InfoBlock } from "../../components/InfoBlock";
import { Box, LaptopLVisible } from "../../styles/layout";
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
import {
  ERROR_UNKNOWN,
  VALIDATION_EMAIL_FORMAT,
  VALIDATION_PHONE_DIGITS,
  VALIDATION_REQUIRED,
} from "../../constants/errorMessages";
import { Button } from "../../components/Button";
import { putProfile } from "../../utils/api";
import { REGEXP_EMAIL, REGEXP_PHONE } from "../../constants/regex";
import { toastError, toastSuccess } from "../../utils/toasts";

export type ActiveTab = "info" | "orders" | "favorite";

const Profile = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("info");
  const { user, mutateUser } = useUser({
    redirectTo: "/login",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    clearErrors,
    unregister,
    getValues,
    setError,
  } = useForm<
    Pick<User, "address" | "email" | "last_name" | "phone"> & {
      password?: string;
    }
  >({
    mode: "onChange",
    shouldFocusError: false,
    defaultValues: {
      last_name: user?.last_name,
      email: user?.email,
      phone: user?.phone,
      address: user?.address,
      password: null,
    },
  });

  const onSubmit = async (values: User & { password?: string }) => {
    try {
      const data = await putProfile(values);
      if ("message" in data) {
        toastError(data.message);
      }
      if ("id" in data) {
        mutateUser(data, false);
        toastSuccess("Профиль успешно обновлён.");
      }
    } catch (err) {
      toastError(ERROR_UNKNOWN);
    }
  };

  const onLogout = async () => {
    destroyCookie(null, "token", { path: "/" });
    await mutateUser(null, false);
  };

  return (
    <div>
      <Head>
        <title>Профиль (ex)bags</title>
      </Head>
      <div className="container m32">
        <StyledProfileHeader $buttonPosition="right">
          <h1>мой аккаунт</h1>
          <ButtonText onClick={onLogout}>
            <Quit /> Выйти
          </ButtonText>
        </StyledProfileHeader>
        <ProfileRoot onSubmit={handleSubmit(onSubmit)}>
          <Tabs>
            <Tab
              type="button"
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
                  {...register("last_name", { required: false })}
                  error={errors?.last_name?.message}
                />
                <Input
                  label="эл. почта"
                  {...register("email", {
                    required: VALIDATION_REQUIRED,
                    pattern: {
                      value: REGEXP_EMAIL,
                      message: VALIDATION_EMAIL_FORMAT,
                    },
                  })}
                  error={errors?.email?.message}
                />
                <Input
                  label="Телефон"
                  placeholder="+7 _____ ____-__-__"
                  {...register("phone", {
                    pattern: {
                      value: REGEXP_PHONE,
                      message: VALIDATION_PHONE_DIGITS,
                    },
                  })}
                  error={errors?.phone?.message}
                />
                <Input
                  label="пароль"
                  type="password"
                  placeholder="........"
                  {...register("password", {
                    required: false,
                  })}
                  error={errors?.password?.message}
                />
                <Input label="адрес" {...register("address")} />
                {/* <Input /> */}
                {/* <Input placeholder="+7 _____ ____-__-__" /> */}
              </InfoTab>
            )}
            <hr />

            <Tab
              type="button"
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
                            {/* 15.01.2021 - 15:00 доставлен по адресу:г.Москва, */}
                            {/* ул.Королева 20 к1, 20 кв. */}
                          </CommentaryRow>
                        </OrderDetails>
                      }
                    />
                  ))}
                {Object.keys(dirtyFields).length > 0 && (
                  <Button type="submit">сохранить</Button>
                )}
              </InfoTab>
            )}
            <hr />
            <Tab
              type="button"
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
                    {...register("last_name")}
                    error={errors?.last_name?.message}
                  />
                  <Input
                    label="эл. почта"
                    {...register("email", {
                      required: VALIDATION_REQUIRED,
                      pattern: {
                        value: REGEXP_EMAIL,
                        message: VALIDATION_EMAIL_FORMAT,
                      },
                    })}
                    error={errors?.email?.message}
                  />
                  <Input
                    label="Телефон"
                    placeholder="+7 _____ ____-__-__"
                    {...register("phone", {
                      pattern: {
                        value: REGEXP_PHONE,
                        message: VALIDATION_PHONE_DIGITS,
                      },
                    })}
                    error={errors?.phone?.message}
                  />
                  <Input
                    label="пароль"
                    placeholder="........"
                    type="password"
                    {...register("password", {
                      required: false,
                    })}
                    error={errors?.password?.message}
                  />
                </Box>
                <Box>
                  <Input label="адрес" {...register("address")} />
                </Box>
                {Object.keys(dirtyFields).length > 0 && (
                  <Button $size="s" type="submit">
                    сохранить
                  </Button>
                )}
              </InfoTab>
            )}
            {activeTab === "orders" && (
              <Box>
                <h4 className="subtitle">мои заказы</h4>
                {user?.orders?.length > 0 ? (
                  <>
                    <TitleRow>
                      <div>№</div>
                      <div>Дата</div>
                      <div>Способ доставки</div>
                      <div>Сумма</div>
                      <div>Статус</div>
                      <div />
                    </TitleRow>
                    {user?.orders.map((order) => (
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
                            <div>
                              {formatSum(order.delivery_cost || 0, "₽")}
                            </div>
                            {order.discount ? (
                              <PreviousPrice>
                                {formatSum(order.total + order.discount, "₽")}
                              </PreviousPrice>
                            ) : (
                              <div />
                            )}
                            <div>
                              {/* 15.01.2021 - 15:00 доставлен по адресу:г.Москва,
                              ул.Королева 20 к1, 20 кв. */}
                            </div>
                          </OrderDetails>
                        }
                      />
                    ))}
                  </>
                ) : (
                  <NoOrders>У вас пока не было заказов.</NoOrders>
                )}
              </Box>
            )}
            {activeTab === "favorite" && (
              <InfoTab>
                {user?.favorites?.length > 0 ? (
                  user?.favorites?.map((item) => (
                    <FavoriteItem key={item.id} {...item} />
                  ))
                ) : (
                  <NoOrders>В избранном пока пусто.</NoOrders>
                )}
              </InfoTab>
            )}
          </LaptopLVisible>
        </ProfileRoot>
      </div>
    </div>
  );
};

export default Profile;
