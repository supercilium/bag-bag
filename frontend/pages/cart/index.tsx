import Head from "next/head";
import { useRouter } from "next/router";
import {
  Attribute,
  BottomBlock,
  CartHeader,
  CartItem,
  Description,
  DescriptionRow,
  DescriptionText,
  ImageContainer,
  Left,
  MainContent,
  NoItems,
  PriceSummary,
  Summary,
  SummaryTop,
  TopBlock,
} from "../../styles/pages/Cart.styles";
import NextImage from "../../components/Image";
import { PreviousPrice } from "../../styles/typography";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";
import {
  formatDimensions,
  formatSum,
  getActualSum,
} from "../../utils/formatters";
import { StyledHeader } from "../../styles/layout";
import useUser from "../../hooks/useUser";
import { useMemo } from "react";
import { getTotalSumAndDiscount } from "../../utils/calculation";
import { clearShoppingBag, removeFromShoppingBag } from "../../utils/api";

const Cart = () => {
  const router = useRouter();

  const { user, mutateUser } = useUser();

  const [totalSum, totalDiscount] = useMemo(
    () => getTotalSumAndDiscount(user?.shopping_bag?.products),
    [user?.shopping_bag?.products]
  );

  if (router.isFallback) {
    return <div>Loading category...</div>;
  }

  const onClickRemove = async (id: number) => {
    const data = await removeFromShoppingBag(id);
    await mutateUser(data, false);
  };

  const onClickClear = async () => {
    const data = await clearShoppingBag();
    await mutateUser(data, false);
  };

  const hasItems = user?.shopping_bag?.products?.length > 0;

  return (
    <div>
      <Head>
        <title>Корзина (ex)bags</title>
      </Head>
      <div className="container m32">
        <StyledHeader $buttonPosition="right">
          <h1>
            корзина
            {hasItems && (
              <i className="h2">({user?.shopping_bag?.products.length})</i>
            )}
          </h1>
          {hasItems && (
            <ButtonText onClick={onClickClear}>Очистить корзину</ButtonText>
          )}
        </StyledHeader>
        {hasItems ? (
          <>
            <MainContent>
              {user?.shopping_bag?.products.map((item) => (
                <CartItem key={item.id}>
                  <ImageContainer>
                    <NextImage
                      layout="fill"
                      objectFit="cover"
                      media={
                        item.images?.[0].formats?.medium || item.images?.[0]
                      }
                    />
                  </ImageContainer>
                  <Left>
                    <TopBlock>
                      <div>
                        <CartHeader>{item.title}</CartHeader>
                        <Description>
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
                        </Description>
                      </div>
                      <DescriptionText>{item.description}</DescriptionText>
                    </TopBlock>
                    <BottomBlock>
                      {item.discount && (
                        <PreviousPrice>
                          {formatSum(item.price, "₽")}
                        </PreviousPrice>
                      )}
                      <span className="h4">
                        {formatSum(
                          getActualSum(item.price, item.discount),
                          "₽"
                        )}
                      </span>
                      <ButtonText onClick={() => onClickRemove(item.id)}>
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
                  <PreviousPrice>{formatSum(totalSum, "₽")}</PreviousPrice>
                  <span>Итого к оплате </span>
                  <span>{formatSum(totalSum - totalDiscount, "₽")}</span>
                </PriceSummary>
              </SummaryTop>
              <Button href="/process" $size="s">
                оформить
              </Button>
            </Summary>
          </>
        ) : (
          <NoItems>Корзина пуста</NoItems>
        )}
      </div>
    </div>
  );
};

export default Cart;
