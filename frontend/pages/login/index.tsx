import Head from "next/head";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../components/Input";
import useUser from "../../hooks/useUser";
import {
  FetchError,
  login,
  register as registerUser,
  LoginFormInterface,
} from "../../utils/api";
import {
  FormBlock,
  FormRoot,
  LoginRoot,
  SmallButton,
  Tab,
  Tabs,
  ErrorMessage,
} from "../../styles/pages/Login.styles";
import {
  VALIDATION_EMAIL_FORMAT,
  VALIDATION_REQUIRED,
} from "../../constants/errorMessages";
import { REGEXP_EMAIL } from "../../constants/regex";
import { Loader } from "../../components/Loader";
import { useRouter } from "next/router";

const Login = () => {
  const { isFallback, query } = useRouter();
  const [activeTabLogin, setActiveTab] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  // here we just check if user is already logged in and redirect to profile
  const { mutateUser, isLoading, user } = useUser({
    redirectTo: query?.goto ? (query.goto as string) : "/profile",
    redirectIfFound: true,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormInterface>({
    shouldFocusError: false,
  });

  const [email, password, lastName] = watch(["email", "password", "last_name"]);

  useEffect(() => {
    setErrorMsg("");
  }, [activeTabLogin, email, password, lastName]);

  const onSubmit: SubmitHandler<LoginFormInterface> = async (data) => {
    try {
      const response = await login({
        identifier: data.email,
        password: data.password,
      });
      console.log(response);
      if ("messages" in response) {
        setErrorMsg(response.messages[0].message);
        return;
      }
      mutateUser(response);
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
        await registerUser({
          email: data.email,
          identifier: data.email,
          username: data.email,
          last_name: data.last_name,
          password: data.password,
        })
      );
    } catch (error) {
      if (error instanceof FetchError) {
        setErrorMsg(error.data.message);
      } else {
        console.error("An unexpected error happened:", error);
      }
    }
  };

  if ((isLoading && !user) || isFallback) {
    return <Loader />;
  }

  return (
    <div>
      <Head>
        <title>Войти или зарегистрироваться BagBag</title>
        <meta
          property="og:description"
          content="Войти или зарегистрироваться | BagBag"
        />
        <meta
          property="og:title"
          content="Войти или зарегистрироваться | BagBag"
        />
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
                  required: VALIDATION_REQUIRED,
                  pattern: {
                    value: REGEXP_EMAIL,
                    message: VALIDATION_EMAIL_FORMAT,
                  },
                })}
                error={errors?.email?.message}
              />
              <Input
                type="password"
                placeholder="Пароль"
                {...register("password", {
                  required: VALIDATION_REQUIRED,
                })}
                error={errors?.password?.message}
              />
              <SmallButton disabled={!!errorMsg} type="submit">
                войти
              </SmallButton>
              <ErrorMessage>{errorMsg}</ErrorMessage>
            </FormRoot>
          ) : (
            <FormRoot onSubmit={handleSubmit(onSubmitRegister)} noValidate>
              <Input
                placeholder="Имя Фамилия"
                {...register("last_name", { required: VALIDATION_REQUIRED })}
                error={errors?.last_name?.message}
              />
              <Input
                placeholder="Эл. почта"
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
                type="password"
                placeholder="Пароль"
                {...register("password", {
                  required: VALIDATION_REQUIRED,
                })}
                error={errors?.password?.message}
              />
              <SmallButton disabled={!!errorMsg} type="submit">
                зарегистрироваться
              </SmallButton>
              <ErrorMessage>{errorMsg}</ErrorMessage>
            </FormRoot>
          )}
        </FormBlock>
      </LoginRoot>
    </div>
  );
};

export default Login;
