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
import { ERROR_UNKNOWN } from "../../constants/errorMessages";
import { toastError, toastSuccess } from "../../utils/toasts";

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
    try {
      const data = await (isInFavorite ? removeFromFavorite : addToFavorite)(
        productId
      );
      await mutateUser(data as User, false);
      if ("message" in data) {
        toastError(ERROR_UNKNOWN);
      } else {
        toastSuccess(`Товар успешно ${isInFavorite ? "удалён" : "добавлен"}.`);
      }
    } catch (err) {
      toastError(ERROR_UNKNOWN);
    }
  };

  const onClickBuyButton = async () => {
    try {
      const data = await addToShoppingBag(productId);
      await mutateUser(data as User, false);
      if ("message" in data) {
        toastError(ERROR_UNKNOWN);
      } else {
        toastSuccess("Товар успешно добавлен в корзину");
      }
    } catch (err) {
      toastError(ERROR_UNKNOWN);
    }
  };

  return (
    <ButtonsBlock className={className}>
      <Button type="button" $size="s" onClick={onClickBuyButton}>
        Купить
      </Button>
      {user && (
        <Button type="button" $size="s" $round onClick={onClick}>
          <LikeButton $isInFavorite={isInFavorite}>
            <Like />
          </LikeButton>
        </Button>
      )}
    </ButtonsBlock>
  );
};
