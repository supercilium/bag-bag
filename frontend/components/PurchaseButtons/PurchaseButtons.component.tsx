import Like from "../icons/like.svg";
import { Button } from "../Button";
import { ButtonsBlock, LikeButton } from "./PurchaseButtons.styles";
import { HTMLAttributes, useEffect, useState } from "react";
import {
  addToFavorite,
  addToShoppingBag,
  removeFromFavorite,
} from "../../utils/api";
import useUser from "../../hooks/useUser";
import { User } from "../../types/user";

export interface PurchaseButtonsProps
  extends React.DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  productId: number;
}

export const PurchaseButtons: React.FC<PurchaseButtonsProps> = ({
  productId,
  className,
}) => {
  const { user, mutateUser } = useUser();

  const [isInFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(user?.favorites?.some((item) => item.id === productId));
  }, [user, productId]);

  const onClick = async () => {
    const data = await (isInFavorite ? removeFromFavorite : addToFavorite)(
      productId
    );
    await mutateUser(data as User, false);
  };

  const onClickBuyButton = async () => {
    const data = await addToShoppingBag(productId);
    await mutateUser(data as User, false);
  };

  return (
    <ButtonsBlock className={className}>
      <Button $size="s" onClick={onClickBuyButton}>
        Купить
      </Button>
      {user && (
        <Button $size="s" $round onClick={onClick}>
          <LikeButton $isInFavorite={isInFavorite}>
            <Like />
          </LikeButton>
        </Button>
      )}
    </ButtonsBlock>
  );
};
