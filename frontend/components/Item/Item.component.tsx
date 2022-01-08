import React from "react";
import { Discount, Condition, ItemRoot, NameBlock } from "./Item.styles";
import NextImage from "../Image";
import Link from "next/link";
import { PreviousPrice } from "../../styles/typography";
import { CommonProps, Dimension } from "../../types/common";
import { Image } from "../../types/image";
import { formatSum } from "../../utils/formatters";

export interface ItemProps extends CommonProps {
  title: string;
  brand: CommonProps;
  category: CommonProps;
  description: string;
  discount?: number;
  images: Image[];
  price: number;
  condition: "ex" | "new";
  status: "published" | "draft";
  color: CommonProps;
  dimension: Dimension;
  year: number;
}

export const Item: React.FC<ItemProps> = (props) => {
  const { images, slug, discount, brand, price, condition } = props;

  const image = images?.[0];
  return (
    <Link href={`/products/${slug}`}>
      <ItemRoot>
        <NextImage media={image} />
        {discount && (
          <Discount className="align-center">
            <i>{`-${discount}%`}</i>
          </Discount>
        )}
        <NameBlock>
          <h4>{brand?.name}</h4>
          <div>
            {discount ? (
              <>
                <span>{formatSum(price - price * discount * 0.01, "₽")}</span>
                <PreviousPrice>{formatSum(price, "₽")}</PreviousPrice>
              </>
            ) : (
              <span>{formatSum(price, "₽")}</span>
            )}
            <Condition>
              {condition === "ex" ? (
                <span>(ex)</span>
              ) : (
                <span>
                  <i>new</i>
                </span>
              )}
            </Condition>
          </div>
        </NameBlock>
      </ItemRoot>
    </Link>
  );
};
