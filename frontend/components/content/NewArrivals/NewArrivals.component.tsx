import React from "react";
import { Button } from "../../Button";
import { Item } from "../../Item";
import { ContentBlock } from "../content.styles";
import { ButtonsContainer, Carousel, Count } from "./NewArrivals.styles";
import Arrow from "../../icons/arrow-big-right.svg";
import { ItemProps } from "../../Item/Item.component";

export interface NewArrivalsProps {
  products: ItemProps[];
}

export const NewArrivals: React.FC<NewArrivalsProps> = ({ products }) => {
  return (
    <ContentBlock>
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
          <Button>посмотреть все</Button>
        </ButtonsContainer>
      </div>
    </ContentBlock>
  );
};
