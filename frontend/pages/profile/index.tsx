import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import { Input } from "../../components/Input"
import Info from "../../components/icons/info.svg"
import Order from "../../components/icons/order.svg"
import Like from "../../components/icons/like.svg"
import { Box, InfoTab, ProfileRoot, Tab, Tabs } from "./Profile.styles"
import { Item } from "../../components/Item"

export type ActiveTab = "info" | "orders" | "favorite"

const Profile = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("info")
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading category...</div>
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
              <table>
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Дата</th>
                    <th>Способ доставки</th>
                    <th>Сумма</th>
                    <th>Статус</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>11</td>
                    <td>21</td>
                    <td>31</td>
                    <td>41</td>
                    <td>51</td>
                  </tr>
                  <tr>
                    <td>11</td>
                    <td>21</td>
                    <td>31</td>
                    <td>41</td>
                    <td>51</td>
                  </tr>
                  <tr>
                    <td>11</td>
                    <td>21</td>
                    <td>31</td>
                    <td>41</td>
                    <td>51</td>
                  </tr>
                </tbody>
              </table>
            </Box>
          )}
          {activeTab === "favorite" && (
            <InfoTab>
              <Item />
              <Item />
              <Item />
            </InfoTab>
          )}
        </ProfileRoot>
      </div>
    </div>
  )
}

export default Profile
