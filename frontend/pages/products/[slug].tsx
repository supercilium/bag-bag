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
import { PreviousPrice } from "../../components/FavoriteItem/FavoriteItem.styles";

import NextImage from "../../components/Image";
import { Item } from "../../components/Item";
import { getProducts, getProduct } from "../../utils/api";
import { formatSum } from "../../utils/formatters";
import { getStrapiMedia } from "../../utils/medias";
import { ItemDescriptionContainer, ProductsRoot } from "./Products.styles";
import { PurchaseButtons } from "../../components/PurchaseButtons";

const ProductPage = ({ product }) => {
  const router = useRouter();
  console.log(product);
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
        <div>
          <NextImage media={product.image} />
        </div>
        <ItemDescriptionContainer>
          <div>
            <h2>{product.title}</h2>
            <div className="subtitle">{product.description}</div>
            <div>{product.description}</div>
            <div className="subtitle">
              {formatSum(product.price, "RUB")}{" "}
              <PreviousPrice>{formatSum(220000, "RUB")}</PreviousPrice>
            </div>
          </div>

          <PurchaseButtons />
        </ItemDescriptionContainer>
      </ProductsRoot>
      <ContentBlock>
        <div className="container">
          <h2>рекомендуем</h2>

          <Carousel>
            {[1, 2, 3, 4].map((item) => (
              <Item key={item} />
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
