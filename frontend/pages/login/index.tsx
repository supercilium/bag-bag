import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Input } from "../../components/Input";
import {
  FormBlock,
  FormRoot,
  LoginRoot,
  SmallButton,
  Tab,
  Tabs,
} from "./Login.styles";

const Login = () => {
  const [activeTabLogin, setActiveTab] = useState(true);
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading category...</div>;
  }

  return (
    <div>
      <Head>
        <title>Login (ex)bags</title>
      </Head>
      <LoginRoot className="align-center">
        <FormBlock>
          <Tabs>
            <Tab $isActive={activeTabLogin} onClick={() => setActiveTab(true)}>
              Вход
            </Tab>
            <Tab
              $isActive={!activeTabLogin}
              onClick={() => setActiveTab(false)}
            >
              Регистрация
            </Tab>
          </Tabs>
          {activeTabLogin ? (
            <FormRoot>
              <Input placeholder="Введите эл. почту" />
              <Input type="password" placeholder="Пароль" />
              <SmallButton>войти</SmallButton>
            </FormRoot>
          ) : (
            <FormRoot>
              <Input placeholder="Имя Фамилия" />
              <Input placeholder="Эл. почта" />
              <Input type="password" placeholder="Пароль" />
              <SmallButton>зарегистрироваться</SmallButton>
            </FormRoot>
          )}
        </FormBlock>
      </LoginRoot>
    </div>
  );
};

export default Login;
