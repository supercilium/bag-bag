import React from "react";
import { Button } from "../../Button";
import { Item } from "../../Item";
import { ContentBlock } from "../content.styles";
import { ButtonsContainer, Carousel, Count } from "./NewArrivals.styles";
import Arrow from "../../icons/arrow-big-right.svg";
import { ProductInterface } from "../../../types/product";
import Link from "next/link";

export interface NewArrivalsProps {
  products: ProductInterface[];
}

export const NewArrivals: React.FC<NewArrivalsProps> = ({ products }) => {
  return (
    <ContentBlock $hidePaddings={true}>
      <div className="container">
        <h2 className="h1">
          новинки <span>new</span>
        </h2>
        <Carousel>
          {products.map((item) => (
            <Item {...item} key={item.slug} />
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
          <Link href="/catalogue?_sort=views:DESC">
            <Button>посмотреть все</Button>
          </Link>
        </ButtonsContainer>
      </div>
    </ContentBlock>
  );
};
