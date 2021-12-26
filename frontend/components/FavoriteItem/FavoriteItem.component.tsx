import NextImage from "../Image";

import {
  Ex,
  FavoriteRoot,
  HidingPurchaseButtons,
  NameBlock,
  PreviousPrice,
} from "./FavoriteItem.styles";

export interface FavoriteItemProps {}

export const FavoriteItem: React.FC<FavoriteItemProps> = (props) => {
  return (
    <FavoriteRoot>
      <NextImage
        src="/favorite-dummy.jpg"
        alt="Купим вашу сумку"
        height="516"
        width="640"
      />
      <NameBlock>
        <h4>Alexander McQuen</h4>
        <div>
          <span>200 000 ₽</span>
          <PreviousPrice>220 000 ₽</PreviousPrice>
          <Ex>(ex)</Ex>
        </div>
      </NameBlock>
      <HidingPurchaseButtons />
    </FavoriteRoot>
  );
};
