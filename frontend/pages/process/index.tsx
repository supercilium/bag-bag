import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";
import { Box, StyledHeader } from "../../styles/layout";
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
} from "./Process.styles";
import NextImage from "../../components/Image";
import { Input } from "../../components/Input";
import { PreviousPrice } from "../../styles/typography";
import { formatSum } from "../../utils/formatters";
import { PriceSummary } from "../cart/Cart.styles";
import { Attribute, DescriptionRow } from "../products/Products.styles";
import { RadioButton } from "../../components/RadioButton";

const Catalogue = () => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading category...</div>;
  }

  return (
    <div>
      <Head>
        <title>Каталог (ex)bags</title>
      </Head>
      <div className="container">
        <div className="m32">
          <StyledHeader $buttonPosition="left">
            <ButtonText href="/cart">Вернуться назад</ButtonText>
            <h1 className="align-center">оформление</h1>
          </StyledHeader>
          <ProcessGrid>
            <div>
              <Box>
                <ProcessRow>
                  <Input placeholder="Имя фамилия" />
                  <Input placeholder="Эл. почта" />
                </ProcessRow>
                <p className="subtitle">Доставка</p>
                <ProcessRow>
                  <div>
                    <RadioButton
                      labelText={
                        <FullWidthLabel>
                          <span>Самовывоз</span>
                          <span>{formatSum(0, "₽")}</span>
                        </FullWidthLabel>
                      }
                    />
                    <RadioButton
                      labelText={
                        <FullWidthLabel>
                          <span>Курьером</span>
                          <span>{formatSum(1200, "₽")}</span>
                        </FullWidthLabel>
                      }
                    />
                  </div>
                  <Input placeholder="+7 ____ ___-__-__" />
                </ProcessRow>
                <div>
                  <Input placeholder="Адрес" />
                </div>
                <ProcessRow>
                  <Input placeholder="Дата" />
                  <Input placeholder="Время" />
                </ProcessRow>
                <div>
                  <Input placeholder="Комментарий" />
                </div>
                <p className="subtitle">Оплата</p>
                <div>
                  <RadioButton labelText={<span>Банковской картой</span>} />
                  <RadioButton labelText="Оплата наличными или при получении в шоуруме" />
                </div>
              </Box>
              <SummaryRow>
                <ProcessRow>
                  <Input placeholder="Промокод" />
                  <PriceSummary>
                    <span>сумма скидки</span>
                    <PreviousPrice>{formatSum(220000, "₽")}</PreviousPrice>
                    <span>Итого к оплате </span>
                    <span>{formatSum(200000, "₽")}</span>
                  </PriceSummary>
                </ProcessRow>

                <Button $size="s">оплатить</Button>
              </SummaryRow>
            </div>
            <Box>
              <NextImage
                src="/dummy-item.png"
                alt="Купим вашу сумку"
                height="581"
                width="719"
              />
              <NameBlock>
                <NameTitle>Louis Vuitton</NameTitle>
                <p className="primary-text">
                  Lorem Ipsum - это текст-"рыба", часто используемый в печати и
                  вэб-дизайне. Lorem Ipsum является
                </p>
                <Details>
                  <DescriptionBlock>
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
                  </DescriptionBlock>
                  <PriceRow>
                    <PreviousPrice>{formatSum(220000, "₽")}</PreviousPrice>
                    {formatSum(220000, "₽")}{" "}
                  </PriceRow>
                </Details>
              </NameBlock>
            </Box>
          </ProcessGrid>
        </div>
      </div>
    </div>
  );
};

export default Catalogue;
