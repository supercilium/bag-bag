import Head from "next/head";
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
import { useEffect, useState } from "react";
import { getTotalSumAndDiscount } from "../../utils/calculation";
import {
  addToShoppingBag,
  clearShoppingBag,
  getProducts,
  removeFromShoppingBag,
} from "../../utils/api";
import { Loader } from "../../components/Loader";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { User } from "../../types/user";
import { ShoppingBagInterface } from "../../types/shoppingBag";

const Cart = () => {
  const { user, mutateUser, isLoading } = useUser();
  const [isProductsLoading, setProductsLoadingState] = useState(false);

  useEffect(() => {
    (async () => {
      if (!user?.id && user?.shopping_bag?.products?.length) {
        setProductsLoadingState(true);
        const products = await getProducts(
          `?${user?.shopping_bag?.products
            ?.map?.(({ id }) => `id_in=${id}`)
            .join("&")}`
        );
        mutateUser({ shopping_bag: { products } } as User);
        setProductsLoadingState(false);
      }
      const { shoppingBag } = parseCookies();
      const parsedShoppingBag =
        shoppingBag && (JSON.parse(shoppingBag || "") as ShoppingBagInterface);
      if (user.id && parsedShoppingBag?.products?.length) {
        const data = await addToShoppingBag(
          `${parsedShoppingBag.products
            .map(({ id }) => `id_in=${id}`)
            .join("&")}`
        );
        destroyCookie(null, "shoppingBag");
        mutateUser(data, false);
      }
    })();
  }, [user?.id]);

  if (isLoading || isProductsLoading) {
    return <Loader />;
  }

  const [totalSum, totalDiscount] = user?.shopping_bag?.products?.length
    ? getTotalSumAndDiscount(user?.shopping_bag?.products)
    : [0, 0];

  const onClickRemove = async (id: number) => {
    if (user?.id) {
      const data = await removeFromShoppingBag(id);
      await mutateUser(data, false);
      return;
    }
    const updatedProducts = user?.shopping_bag?.products?.filter(
      (item) => item.id !== id
    );
    if (updatedProducts.length) {
      setCookie(
        null,
        "shoppingBag",
        JSON.stringify({ shopping_bag: { products: updatedProducts } })
      );
    } else {
      destroyCookie(null, "shoppingBag");
    }
    mutateUser({ shopping_bag: { products: updatedProducts } } as User, false);
  };

  const onClickClear = async () => {
    if (user?.id) {
      const data = await clearShoppingBag();
      mutateUser(data, false);
      return;
    }
    destroyCookie(null, "shoppingBag");
    mutateUser({ shopping_bag: { products: [] } } as User, false);
  };

  const hasItems = user?.shopping_bag?.products?.length > 0;

  return (
    <div>
      <Head>
        <title>Корзина BagBag</title>
        <meta property="og:description" content="Корзина | BagBag" />
        <meta property="og:title" content="Корзина | BagBag" />
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
                    {item.images && (
                      <NextImage
                        layout="fill"
                        objectFit="cover"
                        media={
                          item.images?.[0].formats?.medium || item.images?.[0]
                        }
                      />
                    )}
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
