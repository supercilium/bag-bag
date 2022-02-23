import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "../../components/Button";
import { FileInput } from "../../components/FileInput";
import { Input } from "../../components/Input";
import { Box } from "../../styles/layout";
import { ProcessRow } from "../../styles/pages/Process.styles";
import {
  ImageInputsRow,
  OrderContainer,
} from "../../styles/pages/Offer.styles";
import { SubmitHandler, useForm } from "react-hook-form";
import useUser from "../../hooks/useUser";
import { RequestBagInterface } from "../../types/request";
import { FC, useEffect } from "react";
import { Select } from "../../components/Select";
import { createRequest } from "../../utils/api";
import { Filters } from "../../types/common";

interface OfferProps {
  filters: Filters;
}

const Offer: FC<OfferProps> = ({ filters }) => {
  const router = useRouter();

  const { user } = useUser();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    resetField,
    formState: { errors },
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

  if (router.isFallback) {
    return <div>Loading category...</div>;
  }

  const onSubmit: SubmitHandler<RequestBagInterface> = async (values) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(values.data));

    for (const key in values.files) {
      console.log(values.files[key][0]);
      formData.append(`files.${key}`, values.files[key][0]);
    }
    console.log(formData);
    const res = await createRequest(formData);
  };

  return (
    <div>
      <Head>
        <title>Offer (ex)bags</title>
      </Head>
      <OrderContainer
        onSubmit={handleSubmit(onSubmit, (err) => console.log({ err }))}
      >
        <h1 className="align-center">продажа</h1>
        <Box>
          <ProcessRow>
            <Select
              label="Бренд"
              options={filters.brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
              name="brand"
              {...register("data.brand", { required: "Name is required" })}
              error={errors?.data?.brand?.message}
            />
            <Select
              label="Состояние"
              options={
                <>
                  <option value="new">new</option>
                  <option value="ex">ex</option>
                </>
              }
              {...register("data.condition", { required: "Name is required" })}
              error={errors?.data?.condition?.message}
            />
          </ProcessRow>
          <ProcessRow>
            <Input
              label="Модель"
              placeholder="Введите модель сумки"
              {...register("data.model", { required: "Name is required" })}
              error={errors?.data?.model?.message}
            />
            <Input
              label="Ваша цена"
              placeholder="Введите сумму"
              {...register("data.price", { required: "Name is required" })}
              error={errors?.data?.price?.message}
            />
          </ProcessRow>
          <ProcessRow>
            <Input
              label="Ваше имя"
              placeholder="Введите имя"
              {...register("data.name", { required: "Name is required" })}
              error={errors?.data?.name?.message}
            />
            <Input
              label="Ваш телефон"
              placeholder="+7 _____ ____-__-__"
              {...register("data.phone", { required: "Name is required" })}
              error={errors?.data?.phone?.message}
            />
            <Input
              label="Ваш email"
              placeholder="Введите email"
              {...register("data.email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
              error={errors?.data?.email?.message}
            />
          </ProcessRow>
          <Input
            label="Комментарий"
            placeholder="Укажите ваши пожелания"
            {...register("data.commentary", { required: "Name is required" })}
          />
        </Box>
        <Box>
          <ProcessRow>
            <div className="primary-text">
              Пожалуйста следуйте{" "}
              <Link href="/">Инструкции для съемки изображений</Link>, чтобы
              успешно продать свою сумку. Для загрузки используйте изображения
              от 5 до 10 МБ.
            </div>
            <div className="primary-text">
              Если ваши фотографии не соответствуют вашей сумке, мы не сможем ее
              принять. В этом случае мы вернем сумку по указанному вами адресу.
            </div>
          </ProcessRow>
          <p className="subtitle">внутри</p>
          <ImageInputsRow>
            <FileInput
              labelText="серийный номер*"
              {...register("files.photo_serial_number", {
                required: "Name is required",
              })}
              error={errors?.files?.photo_serial_number?.message}
            />
            <FileInput
              labelText="логотип*"
              {...register("files.photo_logo_inside", {
                required: "Name is required",
              })}
              error={errors?.files?.photo_logo_inside?.message}
            />
            <FileInput
              labelText="внутри*"
              {...register("files.photo_inside", {
                required: "Name is required",
              })}
              error={errors?.files?.photo_inside?.message}
            />
          </ImageInputsRow>
          <p className="subtitle">Снаружи</p>
          <ImageInputsRow>
            <FileInput
              labelText="спереди*"
              {...register("files.photo_front", {
                required: "Name is required",
              })}
              error={errors?.files?.photo_front?.message}
            />
            <FileInput
              labelText="сзади*"
              {...register("files.photo_back", {
                required: "Name is required",
              })}
              error={errors?.files?.photo_back?.message}
            />
            <FileInput
              labelText="сбоку*"
              {...register("files.photo_side", {
                required: "Name is required",
              })}
              error={errors?.files?.photo_side?.message}
            />
            <FileInput
              labelText="снизу*"
              {...register("files.photo_bottom", {
                required: "Name is required",
              })}
              error={errors?.files?.photo_bottom?.message}
            />
            <FileInput
              labelText="замок*"
              {...register("files.photo_fastener", {
                required: "Name is required",
              })}
              error={errors?.files?.photo_fastener?.message}
            />
            <FileInput
              labelText="логотип*"
              {...register("files.photo_logo", {
                required: "Name is required",
              })}
              error={errors?.files?.photo_logo?.message}
            />
          </ImageInputsRow>
        </Box>
        <Box>
          <p>
            <span className="subtitle">повреждения</span>{" "}
            <span className="primary-text">(если имеются)</span>
          </p>
          <FileInput {...register("files.photo_damage")} />
        </Box>
        <Button type="submit" $size="s">
          продать
        </Button>
      </OrderContainer>
    </div>
  );
};

export default Offer;
