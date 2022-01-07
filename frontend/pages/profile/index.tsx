import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Input } from "../../components/Input";
import Info from "../../components/icons/info.svg";
import Order from "../../components/icons/order.svg";
import Like from "../../components/icons/like.svg";
import {
  DetailsButton,
  InfoTab,
  OrderDetails,
  OrderRow,
  ProfileRoot,
  Tab,
  Tabs,
  TitleRow,
} from "./Profile.styles";
import { FavoriteItem } from "../../components/FavoriteItem";
import { InfoBlock } from "../../components/InfoBlock";
import { Box } from "../../styles/layout";

export type ActiveTab = "info" | "orders" | "favorite";

const Profile = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("info");
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading category...</div>;
  }

  return (
    <div>
      <Head>
        <title>Профиль (ex)bags</title>
      </Head>
      <div className="container">
        <h1 className="align-center">мой аккаунт</h1>
        <ProfileRoot>
          <Tabs>
            <Tab
              $active={activeTab === "info"}
              onClick={() => setActiveTab("info")}
            >
              <Info width="36" height="36" /> информация
            </Tab>
            <Tab
              $active={activeTab === "orders"}
              onClick={() => setActiveTab("orders")}
            >
              <Order width="36" height="36" /> заказы
            </Tab>
            <Tab
              $active={activeTab === "favorite"}
              onClick={() => setActiveTab("favorite")}
            >
              <Like width="36" height="36" />
              избранное
            </Tab>
          </Tabs>
          {activeTab === "info" && (
            <InfoTab>
              <Box>
                <Input label="Имя фамилия" />
                <Input label="эл. почта" />
                <Input label="Телефон" placeholder="+7 _____ ____-__-__" />
                <Input label="пароль" placeholder="........" />
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
              <InfoBlock
                title={
                  <OrderRow>
                    <div>11</div>
                    <div>21</div>
                    <div>31</div>
                    <div>41</div>
                    <div>51</div>
                    <DetailsButton>Подробнее</DetailsButton>
                  </OrderRow>
                }
                content={
                  <OrderDetails>
                    <div>0</div>
                    <div>0</div>
                    <div>
                      15.01.2021 - 15:00 доставлен по адресу:г.Москва,
                      ул.Королева 20 к1, 20 кв.
                    </div>
                  </OrderDetails>
                }
              />
            </Box>
          )}
          {activeTab === "favorite" && (
            <InfoTab>
              <FavoriteItem />
              <FavoriteItem />
              <FavoriteItem />
            </InfoTab>
          )}
        </ProfileRoot>
      </div>
    </div>
  );
};

export default Profile;
