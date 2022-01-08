import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "../../components/Button";
import { ContentBlock } from "../../components/content/content.styles";
import {
  ButtonsContainer,
  Carousel,
  Count,
} from "../../components/content/NewArrivals/NewArrivals.styles";
import Arrow from "../../components/icons/arrow-big-right.svg";
import Pay from "../../components/icons/pay-outline.svg";
import Delivery from "../../components/icons/delivery.svg";
import Return from "../../components/icons/return-outline.svg";

import NextImage from "../../components/Image";
import { Item } from "../../components/Item";
import { getProducts, getProduct } from "../../utils/api";
import { formatSum } from "../../utils/formatters";
import { getStrapiMedia } from "../../utils/medias";
import {
  AccordionTitle,
  Attribute,
  Description,
  DescriptionBlock,
  DescriptionRow,
  DescriptionTitle,
  ImageContainer,
  ItemDescriptionContainer,
  PriceRow,
  ProductsRoot,
} from "./Products.styles";
import { PurchaseButtons } from "../../components/PurchaseButtons";
import { InfoBlock } from "../../components/InfoBlock";
import { PreviousPrice } from "../../styles/typography";
import { ItemProps } from "../../components/Item/Item.component";
import { FC } from "react";

const ProductPage: FC<{ product: ItemProps }> = ({ product }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading product...</div>;
  }
  if (!product) {
    return <div>Not found</div>;
  }

  return (
    <div>
      <Head>
        <title>{product.title} product</title>
      </Head>
      <ProductsRoot>
        <ImageContainer>
          {product.images &&
            product.images.map((image) => (
              <NextImage key={image.id} media={image} />
            ))}
        </ImageContainer>
        <ItemDescriptionContainer>
          <div>
            <h2>{product.brand.name}</h2>
            <DescriptionTitle>{product.title}</DescriptionTitle>
            <Description>{product.description}</Description>
            <PriceRow>
              {product.discount ? (
                <>
                  {formatSum(
                    product.price - product.price * product.discount * 0.01,
                    "₽"
                  )}
                  <PreviousPrice>{formatSum(product.price, "₽")}</PreviousPrice>
                </>
              ) : (
                formatSum(product.price, "₽")
              )}
            </PriceRow>
          </div>

          <PurchaseButtons />
          <DescriptionBlock>
            <DescriptionRow>
              <Attribute>Цвет</Attribute>
              <span>{product.color.name}</span>
            </DescriptionRow>
            <DescriptionRow>
              <Attribute>Размер</Attribute>
              <span>{`${product.dimension.lgth} х ${product.dimension.width} х ${product.dimension.height}`}</span>
            </DescriptionRow>
            <DescriptionRow>
              <Attribute>Тип</Attribute>
              <span>{product.category.name}</span>
            </DescriptionRow>
            <DescriptionRow>
              <Attribute>Год</Attribute>
              <span>{product.year}</span>
            </DescriptionRow>
          </DescriptionBlock>
          <InfoBlock
            title={
              <AccordionTitle>
                <Pay width="36" height="36" />
                Информация по оплате
              </AccordionTitle>
            }
            content="К оплате принимаются банковские карты Visa, Master Card и МИР. Пожалуйста, обратите внимание, что заказы, оплаченные банковским переводом, будут отправлены после поступления денежных средств на расчётный счёт компании."
          />
          <InfoBlock
            title={
              <AccordionTitle>
                <Delivery width="36" height="36" />
                Доставка
              </AccordionTitle>
            }
            content="Для Москвы и Санкт-Петербурга, доступна доставка курьером в рабочие дни на условии предоплаты или самовывоз из ближайшего магазина. Доставка по всей территории РФ осуществляется по почте и курьерскими службами."
          />
          <InfoBlock
            title={
              <AccordionTitle>
                <Return width="36" height="36" />
                Возврат
              </AccordionTitle>
            }
            content="Возврат изделия производится при условии сохранения его товарного вида и потребительских свойств, оригинальной упаковки и документа, подтверждающего факт покупки."
          />
        </ItemDescriptionContainer>
      </ProductsRoot>
      <ContentBlock>
        <div className="container">
          <h2>рекомендуем</h2>
          <Carousel>
            {[1, 2, 3, 4].map((item) => (
              <Item {...product} key={item} />
            ))}
          </Carousel>
          <ButtonsContainer>
            <div>
              <Button $round>
                <Arrow className="left-arrow" height="54" width="54" />
              </Button>
              <Count>01 / 04</Count>
              <Button $round>
                <Arrow height="54" width="54" />
              </Button>
            </div>
            <Button>посмотреть все</Button>
          </ButtonsContainer>
        </div>
      </ContentBlock>
    </div>
  );
};

export default ProductPage;

export async function getStaticProps({ params }) {
  try {
    const product = await getProduct(params.slug);
    return { props: { product } };
  } catch (error) {
    return {
      props: {
        error: "error",
      },
    };
  }
}

export async function getStaticPaths() {
  const products = await getProducts();
  return {
    paths: products.map((_product) => {
      return {
        params: { slug: _product.slug },
      };
    }),
    fallback: false,
  };
}
