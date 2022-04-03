import React from "react";
import {
  BlockWithImage,
  SellBlock,
  SellButtons,
  SellRoot,
} from "./Sell.styles";
import NextImage from "../../Image";
import { Button } from "../../Button";
import Link from "next/link";
import Star from "../../icons/star2.svg";

// export interface SellProps {};

export const Sell: React.FC = () => {
  return (
    <SellRoot>
      <SellBlock>
        <div>
          <NextImage
            src="/sell.png"
            alt="Распродажа"
            height="534"
            width="646"
          />
          <h3>
            получайте сразу, <i>а платите потом</i>
          </h3>
          <div />
          {/* <Button>подробнее</Button> */}
        </div>
        <div>
          <div>
            <h3>
              купим вашу сумку
              <br /> и найдем ей новую <br />
              <i>хозяйку</i>
            </h3>
            <BlockWithImage>
              <NextImage
                src="/sell-bag.png"
                alt="Купим вашу сумку"
                height="610"
                width="945"
              />
              <Star />
            </BlockWithImage>
            <SellButtons>
              <Link href="/offer" passHref>
                <Button>продать сумку</Button>
              </Link>
              <p className="primary-text">
                Для нашей компании важно эфективное и ответственное потребление,
                поэтому мы помогаем найти новую хозяйку для ваших любимых вещей.
              </p>
            </SellButtons>
          </div>
        </div>
      </SellBlock>
    </SellRoot>
  );
};
