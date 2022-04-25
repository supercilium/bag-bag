import Head from "next/head";
import MultiCarousel from "react-multi-carousel";
import Arrow from "../../components/icons/arrow-simple-right.svg";
import { ContentBlock } from "../../components/content/content.styles";
import { Carousel } from "../../components/content/NewArrivals/NewArrivals.styles";
import Pay from "../../components/icons/pay-outline.svg";
import Delivery from "../../components/icons/delivery.svg";
import Return from "../../components/icons/return-outline.svg";
import "react-multi-carousel/lib/styles.css";
import NextImage from "../../components/Image";
import { Item } from "../../components/Item";
import { getProducts, getProduct } from "../../utils/api";
import {
  formatDimensions,
  formatSum,
  getActualSum,
} from "../../utils/formatters";
import {
  AccordionTitle,
  Attribute,
  CarouselContainer,
  Description,
  DescriptionBlock,
  DescriptionRow,
  DescriptionTitle,
  ImageContainer,
  ItemButtonsContainer,
  ItemCount,
  ItemDescriptionContainer,
  PriceRow,
  ProductsRoot,
} from "../../styles/pages/Products.styles";
import { PurchaseButtons } from "../../components/PurchaseButtons";
import { InfoBlock } from "../../components/InfoBlock";
import { PreviousPrice } from "../../styles/typography";
import { FC, useMemo } from "react";
import { ProductInterface } from "../../types/product";
import { LaptopLVisible } from "../../styles/layout";
import { useDimensions } from "../../hooks/useDimensions";
import { size } from "../../styles/constants";
import chunk from "lodash-es/chunk";
import { CarouselButtonGroup } from "../../components/CarouselButtonGroup";
import { CarouselButtonGroupProps } from "../../components/CarouselButtonGroup/CarouselButtonGroup.component";
import { Button } from "../../components/Button";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 465 },
    items: 1,
  },
};

const mobile = {
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

interface ProductPageInterface {
  product: ProductInterface;
  recommended: ProductInterface[];
}

const ButtonGroup: React.FC<CarouselButtonGroupProps> = ({
  next,
  previous,
  ...rest
}) => {
  const {
    carouselState: { currentSlide, totalItems },
  } = rest;

  if (totalItems <= 1) {
    return null;
  }

  return (
    <ItemButtonsContainer>
      <Button
        $size="s"
        $round
        disabled={currentSlide === 0}
        onClick={() => previous()}
      >
        <Arrow className="left-arrow" height="22" width="22" />
      </Button>
      <ItemCount>{`0${currentSlide + 1} / 0${totalItems}`}</ItemCount>
      <Button $size="s" $round onClick={() => next()}>
        <Arrow height="22" width="22" />
      </Button>
    </ItemButtonsContainer>
  );
};

const ProductPage: FC<ProductPageInterface> = ({ product, recommended }) => {
  const screenSize = useDimensions();
  const isWideScreen = screenSize.width >= size.laptop;
  const carouselItems = useMemo(() => {
    if (isWideScreen && recommended && recommended?.length >= 0) {
      return chunk(recommended, 4);
    }
  }, [recommended, isWideScreen]);

  if (!product) {
    return <div>Not found</div>;
  }

  return (
    <div>
      <Head>
        <title>{product.title} product</title>
        <meta
          property="og:image"
          content={product.images?.[0]?.formats?.thumbnail?.url}
        />
        <meta property="og:description" content={product.description} />
        <meta
          property="og:title"
          content={`${product.title} by ${product.brand.name} | ex(Bag) Online Store`}
        />
      </Head>
      <ProductsRoot>
        {isWideScreen ? (
          <ImageContainer>
            {product.images &&
              product.images.map((image) => (
                <NextImage key={image.id} media={image} />
              ))}
          </ImageContainer>
        ) : (
          <>
            <h2>{product.brand.name}</h2>
            <PriceRow>
              {formatSum(getActualSum(product.price, product.discount), "₽")}
              {product.discount && (
                <PreviousPrice>{formatSum(product.price, "₽")}</PreviousPrice>
              )}
            </PriceRow>

            <MultiCarousel
              swipeable={true}
              responsive={mobile}
              draggable={false}
              showDots={false}
              ssr={true} // means to render carousel on server-side.
              infinite={false}
              autoPlay={false}
              autoPlaySpeed={100000}
              keyBoardControl={true}
              transitionDuration={500}
              partialVisible={false}
              minimumTouchDrag={10}
              arrows={false}
              customButtonGroup={<ButtonGroup />}
            >
              {product.images &&
                product.images.map((image) => (
                  <ImageContainer key={image.id}>
                    <NextImage media={image} objectFit="cover" layout="fill" />
                  </ImageContainer>
                ))}
            </MultiCarousel>
          </>
        )}

        <ItemDescriptionContainer>
          <div>
            <LaptopLVisible>
              <h2>{product.brand.name}</h2>
            </LaptopLVisible>
            <DescriptionTitle>{product.title}</DescriptionTitle>
            <Description>{product.description}</Description>

            <PriceRow>
              <LaptopLVisible>
                {formatSum(getActualSum(product.price, product.discount), "₽")}
                {product.discount && (
                  <PreviousPrice>{formatSum(product.price, "₽")}</PreviousPrice>
                )}
              </LaptopLVisible>
            </PriceRow>
          </div>

          <PurchaseButtons productId={product.id} />
          <DescriptionBlock>
            <DescriptionRow>
              <Attribute>Цвет</Attribute>
              <span>{product.color.name}</span>
            </DescriptionRow>
            <DescriptionRow>
              <Attribute>Размер</Attribute>
              <span>{formatDimensions(product)}</span>
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
      <ContentBlock $hidePaddings={true}>
        <div className="container">
          <h2 className="h2">рекомендуем</h2>
          <CarouselContainer>
            {isWideScreen ? (
              <MultiCarousel
                swipeable={true}
                responsive={responsive}
                draggable={false}
                showDots={false}
                ssr={true} // means to render carousel on server-side.
                infinite={false}
                autoPlay={false}
                autoPlaySpeed={100000}
                keyBoardControl={true}
                transitionDuration={500}
                partialVisible={false}
                minimumTouchDrag={10}
                renderButtonGroupOutside={true}
                arrows={false}
                customButtonGroup={<CarouselButtonGroup />}
              >
                {carouselItems?.map((chunk, i) => (
                  <Carousel key={i}>
                    {chunk.map((item) => (
                      <Item {...item} key={item.id} />
                    ))}
                  </Carousel>
                ))}
              </MultiCarousel>
            ) : (
              <Carousel>
                {recommended?.map((item) => (
                  <Item {...item} key={item.id} />
                ))}
              </Carousel>
            )}
          </CarouselContainer>
        </div>
      </ContentBlock>
    </div>
  );
};

export default ProductPage;

export async function getStaticProps({ params }) {
  try {
    const product = await getProduct(params.slug);
    const recommended = await getProducts({ _sort: "created_at:DESC" });
    return { props: { product, recommended } };
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
    paths: (products as ProductInterface[]).map((_product) => {
      return {
        params: { slug: _product.slug },
      };
    }),
    fallback: true,
  };
}
