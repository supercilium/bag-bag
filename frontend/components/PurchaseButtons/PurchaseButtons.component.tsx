import Like from "../icons/like.svg";
import { Button } from "../Button";
import { ButtonsBlock } from "./PurchaseButtons.styles";
import { HTMLAttributes } from "react";

export interface PurchaseButtonsProps
  extends React.DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

export const PurchaseButtons: React.FC<PurchaseButtonsProps> = (props) => {
  const isAuthorized = true;
  return (
    <ButtonsBlock className={props.className}>
      <Button $size="s">Купить</Button>
      {isAuthorized && (
        <Button $size="s" $round>
          <Like />
        </Button>
      )}
    </ButtonsBlock>
  );
};
