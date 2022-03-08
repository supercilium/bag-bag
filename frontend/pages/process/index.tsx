import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";
import { Box, LaptopLVisible, StyledHeader } from "../../styles/layout";
import {
  NameBlock,
  NameTitle,
  ProcessGrid,
  ProcessRow,
  SummaryRow,
  DescriptionBlock,
  PriceRow,
  Details,
  FullWidthLabel,
  DescriptionText,
  ProductsList,
  ImageContainer,
  ActiveTab,
  ButtonsBlock,
  PaymentBlock,
} from "../../styles/pages/Process.styles";
import NextImage from "../../components/Image";
import { Input } from "../../components/Input";
import { PreviousPrice } from "../../styles/typography";
import {
  formatDimensions,
  formatSum,
  getActualSum,
} from "../../utils/formatters";
import { PriceSummary } from "../../styles/pages/Cart.styles";
import { Attribute, DescriptionRow } from "../../styles/pages/Products.styles";
import { RadioButton } from "../../components/RadioButton";
import useUser from "../../hooks/useUser";
import { useForm } from "react-hook-form";
import { OrderFormValues, createOrder, checkPromoCode } from "../../utils/api";
import { getTotalSumAndDiscount } from "../../utils/calculation";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import Arrow from "../../components/icons/arrow-simple-right.svg";

/* TODO make dynamic value */
const DELIVERY_COST = 1200;

const Process = () => {
  const router = useRouter();
  const { user, mutateUser } = useUser();
  const [promocodeString, setPromocodeString] = useState("");
  const [activeTab, setActiveTab] = useState<ActiveTab>("shipping");

  const [totalSum, totalDiscount] = getTotalSumAndDiscount(
    user?.shopping_bag?.products
  );

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    setValue,
    trigger,
  } = useForm<OrderFormValues>({
    shouldFocusError: false,
    defaultValues: {
      last_name: user?.last_name,
      phone: user?.phone,
      email: user?.email,
      shippingMethod: "shipping",
      paymentMethod: "card",
      products: user?.shopping_bag?.products,
      total: totalSum,
      discount: totalDiscount,
    },
  });

  useEffect(() => {
    // https://stackoverflow.com/a/64307087/15152568
    reset({
      last_name: user?.last_name,
      phone: user?.phone,
      email: user?.email,
      shippingMethod: "shipping",
      paymentMethod: "card",
      products: user?.shopping_bag?.products,
      total: totalSum,
      discount: totalDiscount,
    });
  }, [user, totalSum, totalDiscount, reset]);

  const { shippingMethod, total, promocode } = watch();

  useEffect(() => {
    if (shippingMethod === "shipping") {
      setValue(
        "total",
        totalSum + 1200 - totalSum * (promocode?.discount || 0) * 0.01
      );
    } else {
      setValue(
        "total",
        totalSum - totalSum * (promocode?.discount || 0) * 0.01
      );
    }
  }, [shippingMethod, setValue, totalSum, promocode]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  if (router.isFallback) {
    return <div>Loading category...</div>;
  }

  const { shopping_bag } = user || {};

  const onSubmit = async (values: OrderFormValues) => {
    try {
      const order = await createOrder(values);
      console.log(order);
      await mutateUser();
      router.replace("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckPromocode = async () => {
    setError("promocode.code", undefined);
    if (promocodeString && promocodeString !== promocode?.code) {
      try {
        const res = await checkPromoCode(promocodeString);
        if ("message" in res) {
          setError("promocode.code", { message: res?.message });
        }
        if ("id" in res) {
          setValue("promocode", res);
        }
      } catch (err) {
        console.log({ err });
        setError("promocode.code", { message: err?.message });
      }
    }
  };

  const handleClickNextButton = async () => {
    await trigger(["address", "email", "phone", "shipping_date"]);

    if (!Object.keys(errors).length) {
      setActiveTab("payment");
    }
  };

  console.log(activeTab);
  return (
    <div>
      <Head>
        <title>Оформление (ex)bags</title>
      </Head>
      <div className="container">
        <div className="m32">
          <StyledHeader $buttonPosition="left">
            <LaptopLVisible>
              <ButtonText href="/cart">Вернуться назад</ButtonText>
            </LaptopLVisible>
            <h1 className="align-center">оформление</h1>
          </StyledHeader>
          <Breadcrumbs
            items={[
              { title: "доставка", active: activeTab === "shipping" },
              { title: "оплата", active: activeTab === "payment" },
              { title: "ваш заказ", active: activeTab === "result" },
            ]}
          />

          <ProcessGrid $activeTab={activeTab}>
            <div>
              <Box>
                <ProcessRow>
                  <Input
                    label="Имя фамилия"
                    placeholder="Имя фамилия"
                    {...register("last_name", { required: "Name is required" })}
                    error={errors?.last_name?.message}
                  />
                  <Input
                    label="Эл. почта"
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
                </ProcessRow>
                <p className="subtitle">Доставка</p>
                <ProcessRow>
                  <div>
                    <RadioButton
                      value="pickup"
                      id="pickup"
                      labelText={
                        <FullWidthLabel>
                          <span>Самовывоз</span>
                          <span>{formatSum(0, "₽")}</span>
                        </FullWidthLabel>
                      }
                      {...register("shippingMethod")}
                    />
                    <RadioButton
                      value="shipping"
                      id="shipping"
                      labelText={
                        <FullWidthLabel>
                          <span>Курьером</span>
                          <span>{formatSum(DELIVERY_COST, "₽")}</span>
                        </FullWidthLabel>
                      }
                      {...register("shippingMethod")}
                    />
                  </div>
                  <Input
                    label="Телефон"
                    placeholder="+7 ____ ___-__-__"
                    {...register("phone", { required: "Phone is required" })}
                    error={errors?.phone?.message}
                  />
                </ProcessRow>
                {shippingMethod === "shipping" ? (
                  <>
                    <div>
                      <Input
                        placeholder="Адрес"
                        {...register("address", {
                          required:
                            shippingMethod === "shipping" &&
                            "Address is required",
                        })}
                        error={errors?.address?.message}
                      />
                    </div>
                    <ProcessRow>
                      <Input
                        placeholder="Дата"
                        {...register("shipping_date", {
                          required:
                            shippingMethod === "shipping" &&
                            "Address is required",
                        })}
                        error={errors?.shipping_date?.message}
                      />
                      <Input
                        placeholder="Время"
                        {...register("shipping_date", {
                          required:
                            shippingMethod === "shipping" &&
                            "Address is required",
                        })}
                        error={errors?.shipping_date?.message}
                      />
                    </ProcessRow>
                  </>
                ) : (
                  <div>
                    <Input placeholder="Адрес" {...register("address")} />
                  </div>
                )}
                <div>
                  <Input
                    placeholder="Комментарий"
                    {...register("commentary")}
                    error={errors?.commentary?.message}
                  />
                </div>
                <LaptopLVisible>
                  <p className="subtitle">Оплата</p>
                  <div>
                    <RadioButton
                      value="card"
                      labelText={<span>Банковской картой</span>}
                      {...register("paymentMethod")}
                      error={errors?.paymentMethod?.message}
                    />
                    <RadioButton
                      value="cash"
                      labelText="Оплата наличными или при получении в шоуруме"
                      {...register("paymentMethod")}
                      error={errors?.paymentMethod?.message}
                    />
                  </div>
                </LaptopLVisible>
              </Box>
            </div>
            <PaymentBlock>
              <Box>
                <p className="subtitle">Оплата</p>
                <div>
                  <RadioButton
                    value="card"
                    labelText={<span>Банковской картой</span>}
                    {...register("paymentMethod")}
                    error={errors?.paymentMethod?.message}
                  />
                  <RadioButton
                    value="cash"
                    labelText="Оплата наличными или при получении в шоуруме"
                    {...register("paymentMethod")}
                    error={errors?.paymentMethod?.message}
                  />
                </div>
              </Box>
            </PaymentBlock>
            <SummaryRow>
              <ProcessRow>
                <Input
                  placeholder="Промокод"
                  value={promocodeString}
                  onChange={({ currentTarget }) =>
                    setPromocodeString(currentTarget.value)
                  }
                  onBlur={() => handleCheckPromocode()}
                  error={errors?.promocode?.code?.message}
                />
                <PriceSummary>
                  <span>сумма скидки</span>
                  <PreviousPrice>{formatSum(total, "₽")}</PreviousPrice>
                  <span>Итого к оплате </span>
                  <span>{formatSum(total - totalDiscount, "₽")}</span>
                </PriceSummary>
              </ProcessRow>
              <LaptopLVisible>
                <Button onClick={handleSubmit(onSubmit)} $size="s">
                  оплатить
                </Button>
                <ButtonText
                  type="button"
                  onClick={() => setActiveTab("payment")}
                >
                  <Arrow width="22" height="22" />
                  Вернуться назад
                </ButtonText>
              </LaptopLVisible>
            </SummaryRow>
            <ButtonsBlock>
              <Button onClick={handleClickNextButton} type="button" $size="s">
                далее
              </Button>
            </ButtonsBlock>
            <ProductsList>
              {shopping_bag?.products?.length > 0 &&
                shopping_bag.products.map((item) => (
                  <Box key={item.id}>
                    <ImageContainer>
                      <NextImage
                        layout="fill"
                        objectFit="cover"
                        media={item.images?.[0]}
                      />
                    </ImageContainer>
                    <NameBlock>
                      <NameTitle>{item.brand.name}</NameTitle>
                      {/* <NameTitle>{item.title}</NameTitle> */}
                      <DescriptionText>{item.description}</DescriptionText>
                      <Details>
                        <DescriptionBlock>
                          <DescriptionRow>
                            <Attribute>Цвет</Attribute>
                            <span>{item.color?.name}</span>
                          </DescriptionRow>
                          <DescriptionRow>
                            <Attribute>Размер</Attribute>
                            <span>{formatDimensions(item)}</span>
                          </DescriptionRow>
                          <DescriptionRow>
                            <Attribute>Тип</Attribute>
                            <span>{item.category?.name}</span>
                          </DescriptionRow>
                          <DescriptionRow>
                            <Attribute>Год</Attribute>
                            <span>{item.year}</span>
                          </DescriptionRow>
                        </DescriptionBlock>
                        <PriceRow>
                          <PreviousPrice>
                            {formatSum(item.price, "₽")}
                          </PreviousPrice>
                          {formatSum(
                            getActualSum(item.price, item.discount),
                            "₽"
                          )}
                        </PriceRow>
                      </Details>
                    </NameBlock>
                  </Box>
                ))}
            </ProductsList>
          </ProcessGrid>
        </div>
      </div>
    </div>
  );
};

export default Process;
