import Link from "next/link";
import { PreviousPrice } from "../../styles/typography";
import { ProductInterface } from "../../types/product";
import { formatSum, getActualSum } from "../../utils/formatters";
import NextImage from "../Image";

import {
  Ex,
  FavoriteRoot,
  HidingPurchaseButtons,
  ImageContainer,
  NameBlock,
} from "./FavoriteItem.styles";

export interface FavoriteItemProps extends ProductInterface {}

export const FavoriteItem: React.FC<FavoriteItemProps> = (item) => {
  return (
    <Link href={`/products/${item.slug}`} passHref>
      <FavoriteRoot>
        <ImageContainer>
          <NextImage media={item.images?.[0]} layout="fill" objectFit="cover" />
        </ImageContainer>
        <NameBlock>
          <h4>{item.title}</h4>
          <div>
            <span>
              {formatSum(getActualSum(item.price, item.discount), "₽")}
            </span>
            {item.discount && (
              <PreviousPrice>{formatSum(item.price, "₽")}</PreviousPrice>
            )}
            <Ex>
              {item.condition === "ex" ? (
                <span>(ex)</span>
              ) : (
                <span>
                  <i>new</i>
                </span>
              )}
            </Ex>
          </div>
        </NameBlock>
        <HidingPurchaseButtons productId={item.id} />
      </FavoriteRoot>
    </Link>
  );
};
