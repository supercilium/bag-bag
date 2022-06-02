import Like from "../icons/like.svg";
import { Button } from "../Button";
import { ButtonsBlock, LikeButton } from "./PurchaseButtons.styles";
import { HTMLAttributes, useEffect, useMemo, useState } from "react";
import {
  addToFavorite,
  addToShoppingBag,
  removeFromFavorite,
} from "../../utils/api";
import useUser from "../../hooks/useUser";
import { User } from "../../types/user";
import { ERROR_UNKNOWN } from "../../constants/errorMessages";
import { toastError, toastSuccess } from "../../utils/toasts";
import { destroyCookie, setCookie } from "nookies";

export interface PurchaseButtonsProps
  extends React.DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  productId: number;
  buttonTitle?: string;
  onButtonClick?: () => void;
}

export const PurchaseButtons: React.FC<PurchaseButtonsProps> = ({
  productId,
  className,
  buttonTitle,
  onButtonClick,
}) => {
  const { user, mutateUser } = useUser();
  const [isInFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    console.log(user?.shopping_bag);
    if (!user?.shopping_bag) {
      return;
    }
    if (!user?.id) {
      setCookie(null, "shoppingBag", JSON.stringify(user?.shopping_bag));
    } else {
      destroyCookie(null, "shoppingBag");
    }
  }, [user?.shopping_bag, user?.id]);

  useEffect(() => {
    setIsFavorite(user?.favorites?.some((item) => item.id === productId));
  }, [user, productId]);

  const onClick: React.MouseEventHandler = async (event) => {
    event.stopPropagation();
    try {
      const data = await (isInFavorite ? removeFromFavorite : addToFavorite)(
        productId
      );
      if ("message" in data) {
        toastError(ERROR_UNKNOWN);
      } else {
        await mutateUser(data, false);
        toastSuccess(`Товар успешно ${isInFavorite ? "удалён" : "добавлен"}.`);
      }
    } catch (err) {
      toastError(ERROR_UNKNOWN);
    }
  };

  const onClickBuyButton = async () => {
    if (user?.id) {
      try {
        const data = await addToShoppingBag(`id=${productId}`);
        if ("message" in data) {
          toastError(ERROR_UNKNOWN);
        } else {
          await mutateUser(data, false);
          toastSuccess("Товар успешно добавлен в корзину");
        }
      } catch (err) {
        toastError(ERROR_UNKNOWN);
      }
    } else {
      mutateUser(
        {
          shopping_bag: {
            products: [
              ...(user?.shopping_bag?.products || []),
              { id: productId },
            ],
          },
        } as User,
        false
      );
      toastSuccess("Товар успешно добавлен в корзину");
    }
  };

  const isBagInCart = useMemo(
    () => user?.shopping_bag?.products?.some((item) => item?.id === productId),
    [user?.shopping_bag, productId]
  );

  return (
    <ButtonsBlock className={className}>
      <Button
        type="button"
        $size="s"
        onClick={onButtonClick || onClickBuyButton}
        disabled={!buttonTitle && isBagInCart}
      >
        {buttonTitle || "Купить"}
      </Button>
      {user?.id && (
        <Button type="button" $size="s" $round onClick={onClick}>
          <LikeButton $isInFavorite={isInFavorite}>
            <Like />
          </LikeButton>
        </Button>
      )}
    </ButtonsBlock>
  );
};
