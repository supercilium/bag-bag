import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  Attribute,
  BottomBlock,
  CartHeader,
  CartItem,
  Description,
  DescriptionRow,
  Left,
  MainContent,
  PriceSummary,
  Summary,
  SummaryTop,
  TopBlock,
} from "./Cart.styles";
import NextImage from "../../components/Image";
import { PreviousPrice } from "../../styles/typography";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";
import { formatSum } from "../../utils/formatters";
import { StyledHeader } from "../../styles/layout";

const Login = () => {
  const [items, setItems] = useState([1, 2]);
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading category...</div>;
  }

  return (
    <div>
      <Head>
        <title>Корзина (ex)bags</title>
      </Head>
      <div className="container m32">
        <StyledHeader $buttonPosition="right">
          <h1 className="align-center">
            корзина
            {items?.length > 0 && <i className="h2">({items.length})</i>}
          </h1>
          <ButtonText onClick={() => setItems([])}>Очистить корзину</ButtonText>
        </StyledHeader>
        {items?.length > 0 && (
          <>
            <MainContent>
              {items.map((item) => (
                <CartItem key={item}>
                  <NextImage
                    src="/dummy-item.png"
                    alt="Купим вашу сумку"
                    height="445"
                    width="345"
                  />
                  <Left>
                    <TopBlock>
                      <div>
                        <CartHeader>Louis Vuitton</CartHeader>
                        <Description>
                          <DescriptionRow>
                            <Attribute>Цвет</Attribute>
                            <span>Цвет</span>
                          </DescriptionRow>
                          <DescriptionRow>
                            <Attribute>Размер</Attribute>
                            <span>27 х 26 х 22</span>
                          </DescriptionRow>
                          <DescriptionRow>
                            <Attribute>Тип</Attribute>
                            <span>Сумка</span>
                          </DescriptionRow>
                          <DescriptionRow>
                            <Attribute>Год</Attribute>
                            <span>2021</span>
                          </DescriptionRow>
                        </Description>
                      </div>
                      <p className="primary-text">
                        Lorem Ipsum - это текст-&quot;рыба&quot;, часто
                        используемый в печати и вэб-дизайне. Lorem Ipsum
                        является{" "}
                      </p>
                    </TopBlock>
                    <BottomBlock>
                      <PreviousPrice>{formatSum(220000, "₽")}</PreviousPrice>
                      <span className="h4">{formatSum(200000, "₽")}</span>
                      <ButtonText onClick={() => setItems([])}>
                        Удалить
                      </ButtonText>
                    </BottomBlock>
                  </Left>
                </CartItem>
              ))}
            </MainContent>
            <Summary>
              <SummaryTop>
                <p className="h4">ваш заказ</p>
                <PriceSummary>
                  <span>сумма скидки</span>
                  <PreviousPrice>{formatSum(220000, "₽")}</PreviousPrice>
                  <span>Итого к оплате </span>
                  <span>{formatSum(200000, "₽")}</span>
                </PriceSummary>
              </SummaryTop>
              <Button href="/process" $size="s">
                оформить
              </Button>
            </Summary>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
