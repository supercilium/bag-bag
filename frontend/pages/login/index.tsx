import Head from "next/head";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../components/Input";
import useUser from "../../hooks/useUser";
import { AuthResponse, User } from "../../types/user";
import { fetchJson, FetchError } from "../../utils/api";
import {
  FormBlock,
  FormRoot,
  LoginRoot,
  SmallButton,
  Tab,
  Tabs,
} from "./Login.styles";

interface LoginFormInterface extends User {
  password: string;
  identifier: string;
}

const Login = () => {
  const [activeTabLogin, setActiveTab] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  // here we just check if user is already logged in and redirect to profile
  const { mutateUser } = useUser({
    redirectTo: "/profile",
    redirectIfFound: true,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    unregister,
    getValues,
    setError,
  } = useForm<LoginFormInterface>({
    shouldFocusError: false,
  });

  const onSubmit: SubmitHandler<LoginFormInterface> = async (data) => {
    try {
      const res = await fetchJson<AuthResponse>(
        "/api/login",
        {
          method: "POST",
          body: JSON.stringify({
            identifier: data.email,
            password: data.password,
          }),
        },
        false
      );
      mutateUser(res.user, false);
    } catch (error) {
      if (error instanceof FetchError) {
        setErrorMsg(error.data.message);
      } else {
        console.error("An unexpected error happened:", error);
      }
    }
  };

  const onSubmitRegister: SubmitHandler<LoginFormInterface> = async (data) => {
    try {
      mutateUser(
        await fetchJson(
          "/api/register",
          {
            method: "POST",
            body: JSON.stringify({
              email: data.email,
              name: data.name,
              username: data.email,
              password: data.password,
            }),
          },
          false
        )
      );
    } catch (error) {
      if (error instanceof FetchError) {
        setErrorMsg(error.data.message);
      } else {
        console.error("An unexpected error happened:", error);
      }
    }
  };

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
            <FormRoot onSubmit={handleSubmit(onSubmit)} noValidate>
              <Input
                placeholder="Введите эл. почту"
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
                type="password"
                placeholder="Пароль"
                {...register("password", {
                  required: "Password is required",
                })}
                error={errors?.password?.message}
              />
              <SmallButton type="submit">войти</SmallButton>
            </FormRoot>
          ) : (
            <FormRoot onSubmit={handleSubmit(onSubmitRegister)} noValidate>
              <Input
                placeholder="Имя Фамилия"
                {...register("name", { required: "Name is required" })}
                error={errors?.name?.message}
              />
              <Input
                placeholder="Эл. почта"
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
                type="password"
                placeholder="Пароль"
                {...register("password", {
                  required: "Password is required",
                })}
                error={errors?.password?.message}
              />
              <SmallButton type="submit">зарегистрироваться</SmallButton>
            </FormRoot>
          )}
        </FormBlock>
      </LoginRoot>
    </div>
  );
};

export default Login;
