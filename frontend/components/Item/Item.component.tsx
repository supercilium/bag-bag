import React from "react";
import { Discount, Ex, ItemRoot, NameBlock } from "./Item.styles";
import NextImage from "../Image";
import Link from "next/link";
import { PreviousPrice } from "../../styles/typography";

export interface ItemProps {}

export const Item: React.FC<ItemProps> = (props) => {
  return (
    <Link href="/products/strapi" {...props}>
      <ItemRoot>
        <NextImage
          src="/dummy-item.png"
          alt="Купим вашу сумку"
          height="476"
          width="405"
        />
        <Discount className="align-center">-15%</Discount>
        <NameBlock>
          <h4>Alexander McQuen</h4>
          <div>
            <span>200 000 ₽</span>
            <PreviousPrice>220 000 ₽</PreviousPrice>
            <Ex>(ex)</Ex>
          </div>
        </NameBlock>
      </ItemRoot>
    </Link>
  );
};
