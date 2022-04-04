import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "../../components/Button";
import { FileInput } from "../../components/FileInput";
import { Input } from "../../components/Input";
import { Box, StatusBox, StyledHeader } from "../../styles/layout";
import {
  ImageInputsRow,
  OrderContainer,
  OfferRow,
  OfferTitle,
  TabName,
  MobileButtons,
  ErrorMessage,
  ResultRow,
  ImageGrid,
} from "../../styles/pages/Offer.styles";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import useUser from "../../hooks/useUser";
import { RequestBagInterface } from "../../types/request";
import { FC, useEffect, useState } from "react";
import { Select } from "../../components/Select";
import { createRequest } from "../../utils/api";
import { Filters } from "../../types/common";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { ButtonText } from "../../components/ButtonText";
import Arrow from "../../components/icons/arrow-simple-right.svg";
import Check from "../../components/icons/check-outline.svg";
import { useDimensions } from "../../hooks/useDimensions";
import { size } from "../../styles/constants";
import { formatSum } from "../../utils/formatters";
import {
  ERROR_UNKNOWN,
  VALIDATION_EMAIL_FORMAT,
  VALIDATION_PHONE_DIGITS,
  VALIDATION_REQUIRED,
} from "../../constants/errorMessages";
import { REGEXP_EMAIL, REGEXP_PHONE } from "../../constants/regex";
import { toastError, toastSuccess } from "../../utils/toasts";

interface OfferProps {
  filters: Filters;
}

const Offer: FC<OfferProps> = ({ filters }) => {
  const router = useRouter();

  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<TabName>("common");
  const { width } = useDimensions();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    getValues,
    formState: { errors },
    control,
  } = useForm<RequestBagInterface>({
    shouldFocusError: false,
    defaultValues: {
      data: {
        name: user?.last_name,
        phone: user?.phone,
        email: user?.email,
      },
    },
  });

  useEffect(() => {
    // https://stackoverflow.com/a/64307087/15152568
    if (user) {
      reset({
        data: {
          name: user.last_name,
          phone: user.phone,
          email: user.email,
        },
      });
    }
  }, [user, reset]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  if (router.isFallback) {
    return <div>Loading category...</div>;
  }

  const handleClickNextButton = async () => {
    await trigger([
      "data.brand",
      "data.condition",
      "data.email",
      "data.model",
      "data.name",
      "data.price",
      "data.phone",
    ]);
    if (!errors?.data) {
      setActiveTab("images");
    }
  };

  const onSubmit: SubmitHandler<RequestBagInterface> = async (values) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        ...values.data,
        brand: +values.data.brand.value,
        condition: values.data.condition.value,
      })
    );

    for (const key in values.files) {
      formData.append(`files.${key}`, values.files[key][0]);
    }

    try {
      const res = await createRequest(formData);
      if ("id" in res) {
        setActiveTab("result");
        toastSuccess("Товар успешно отправлен. Ожидайте звонка менеджера.");
      }
      if ("message" in res) {
        toastError(res.message);
      }
    } catch (error) {
      toastError(ERROR_UNKNOWN);
    } finally {
      setIsLoading(false);
    }
  };

  const values = getValues();

  return (
    <div>
      <Head>
        <title>Offer (ex)bags</title>
      </Head>
      <OfferTitle>
        <StyledHeader>
          <h1>продажа</h1>
        </StyledHeader>
        <Breadcrumbs
          items={[
            { title: "информация", active: activeTab === "common" },
            { title: "фото", active: activeTab === "images" },
            { title: "заявка", active: activeTab === "result" },
          ]}
        />
      </OfferTitle>
      <OrderContainer onSubmit={handleSubmit(onSubmit)} $activeTab={activeTab}>
        <div>
          <Box>
            <OfferRow>
              <Controller
                control={control}
                name="data.brand"
                rules={{ required: VALIDATION_REQUIRED }}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Бренд"
                    placeholder="Выберите бренд"
                    options={filters.brands.map((brand) => ({
                      value: "" + brand.id,
                      label: brand.name,
                    }))}
                    // {...register("data.brand", { required: VALIDATION_REQUIRED })}
                    error={errors?.data?.brand?.value?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="data.condition"
                rules={{ required: VALIDATION_REQUIRED }}
                render={({ field }) => (
                  <Select
                    label="Состояние"
                    placeholder="Выберите"
                    {...field}
                    options={[
                      { value: "new", label: "new" },
                      { value: "ex", label: "ex" },
                    ]}
                    error={errors?.data?.condition?.value?.message}
                  />
                )}
              />
            </OfferRow>
            <OfferRow>
              <Input
                label="Модель"
                placeholder="Введите модель сумки"
                {...register("data.model", {
                  required: VALIDATION_REQUIRED,
                })}
                error={errors?.data?.model?.message}
              />
              <Input
                label="Ваша цена"
                placeholder="Введите сумму"
                type="number"
                {...register("data.price", {
                  required: VALIDATION_REQUIRED,
                  min: 0,
                })}
                error={errors?.data?.price?.message}
              />
            </OfferRow>
            <OfferRow>
              <Input
                label="Ваше имя"
                placeholder="Введите имя"
                {...register("data.name", { required: VALIDATION_REQUIRED })}
                error={errors?.data?.name?.message}
              />
              <Input
                label="Ваш телефон"
                placeholder="+7 _____ ____-__-__"
                {...register("data.phone", {
                  required: VALIDATION_REQUIRED,
                  pattern: {
                    value: REGEXP_PHONE,
                    message: VALIDATION_PHONE_DIGITS,
                  },
                })}
                error={errors?.data?.phone?.message}
              />
              <Input
                label="Ваш email"
                placeholder="Введите email"
                {...register("data.email", {
                  required: VALIDATION_REQUIRED,
                  pattern: {
                    value: REGEXP_EMAIL,
                    message: VALIDATION_EMAIL_FORMAT,
                  },
                })}
                error={errors?.data?.email?.message}
              />
            </OfferRow>
            <Input
              label="Комментарий"
              placeholder="Укажите ваши пожелания"
              {...register("data.commentary")}
            />
          </Box>
          <MobileButtons>
            <Button onClick={handleClickNextButton} type="button" $size="s">
              далее
            </Button>
          </MobileButtons>
        </div>
        <div>
          <Box>
            <OfferRow>
              <div className="primary-text">
                Пожалуйста следуйте{" "}
                <Link href="/">Инструкции для съемки изображений</Link>, чтобы
                успешно продать свою сумку. Для загрузки используйте изображения
                от 5 до 10 МБ.
              </div>
              <div className="primary-text">
                Если ваши фотографии не соответствуют вашей сумке, мы не сможем
                ее принять. В этом случае мы вернем сумку по указанному вами
                адресу.
              </div>
            </OfferRow>
            <p className="subtitle">внутри</p>
            <ImageInputsRow>
              <FileInput
                labelText="серийный номер*"
                {...register("files.photo_serial_number", {
                  required: VALIDATION_REQUIRED,
                })}
                error={errors?.files?.photo_serial_number?.message}
              />
              <FileInput
                labelText="логотип*"
                {...register("files.photo_logo_inside", {
                  required: VALIDATION_REQUIRED,
                })}
                error={errors?.files?.photo_logo_inside?.message}
              />
              <FileInput
                labelText="внутри*"
                {...register("files.photo_inside", {
                  required: VALIDATION_REQUIRED,
                })}
                error={errors?.files?.photo_inside?.message}
              />
            </ImageInputsRow>
            <p className="subtitle">Снаружи</p>
            <ImageInputsRow>
              <FileInput
                labelText="спереди*"
                {...register("files.photo_front", {
                  required: VALIDATION_REQUIRED,
                })}
                error={errors?.files?.photo_front?.message}
              />
              <FileInput
                labelText="сзади*"
                {...register("files.photo_back", {
                  required: VALIDATION_REQUIRED,
                })}
                error={errors?.files?.photo_back?.message}
              />
              <FileInput
                labelText="сбоку*"
                {...register("files.photo_side", {
                  required: VALIDATION_REQUIRED,
                })}
                error={errors?.files?.photo_side?.message}
              />
              <FileInput
                labelText="снизу*"
                {...register("files.photo_bottom", {
                  required: VALIDATION_REQUIRED,
                })}
                error={errors?.files?.photo_bottom?.message}
              />
              <FileInput
                labelText="замок*"
                {...register("files.photo_fastener", {
                  required: VALIDATION_REQUIRED,
                })}
                error={errors?.files?.photo_fastener?.message}
              />
              <FileInput
                labelText="логотип*"
                {...register("files.photo_logo", {
                  required: VALIDATION_REQUIRED,
                })}
                error={errors?.files?.photo_logo?.message}
              />
            </ImageInputsRow>
            {errors.files && (
              <ErrorMessage>
                Некоторые изображения не подходят для загрузки.
              </ErrorMessage>
            )}
          </Box>
          <Box>
            <p>
              <span className="subtitle">повреждения</span>{" "}
              <span className="primary-text">(если имеются)</span>
            </p>
            <FileInput {...register("files.photo_damage")} />
          </Box>
          <Button type="submit" $size="s" disabled={isLoading}>
            Отправить
          </Button>

          <MobileButtons>
            <ButtonText type="button" onClick={() => setActiveTab("common")}>
              <Arrow width="22" height="22" />
              Вернуться назад
            </ButtonText>
          </MobileButtons>
        </div>
        {width < size.laptopL && (
          <div>
            <StatusBox $status="success">
              <Check width="22" height="22" />
              <div>Товар успешно отправлен. Ожидайте звонка менеджера.</div>
            </StatusBox>
            <Box>
              <ResultRow>
                {
                  filters.brands?.find(
                    ({ id }) => id === +values?.data?.brand?.value
                  )?.name
                }
              </ResultRow>
              <ResultRow>
                {values?.data?.condition?.value === "ex"
                  ? "Б/У"
                  : "Отличное состояние"}
              </ResultRow>
              <ResultRow>{values?.data?.model}</ResultRow>
              <ResultRow>{formatSum(values?.data?.price, "₽")}</ResultRow>

              <ImageGrid>
                {values?.files &&
                  Object.keys(values.files)?.map((key) => {
                    console.log(values.files);
                    console.log(Object.keys(values.files));

                    if (values.files?.[key]?.length) {
                      const src = window.URL?.createObjectURL(
                        values.files?.[key]?.[0]
                      );
                      return (
                        src && (
                          <div>
                            <img key={key} src={src} />
                          </div>
                        )
                      );
                    }
                    return null;
                  })}
              </ImageGrid>
              <Link href="/" passHref>
                <Button $size="s">на главную</Button>
              </Link>
            </Box>
          </div>
        )}
      </OrderContainer>
    </div>
  );
};

export default Offer;
