import React from "react";
import { Discount, Condition, ItemRoot, NameBlock } from "./Item.styles";
import NextImage from "../Image";
import Link from "next/link";
import { PreviousPrice } from "../../styles/typography";
import { formatSum, getActualSum } from "../../utils/formatters";
import { ProductInterface } from "../../types/product";

export const Item: React.FC<ProductInterface> = (props) => {
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
            <span>{formatSum(getActualSum(price, discount), "₽")}</span>
            {discount && <PreviousPrice>{formatSum(price, "₽")}</PreviousPrice>}
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
