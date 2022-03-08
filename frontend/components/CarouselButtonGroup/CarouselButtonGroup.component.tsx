import { CarouselInternalState } from "react-multi-carousel";
import { Button } from "../Button";
import { ButtonsContainer, Count } from "./CarouselButtonGroup.styles";
import Arrow from "../icons/arrow-big-right.svg";
import Link from "next/link";

export interface CarouselButtonGroupProps {
  next?: () => void;
  previous?: () => void;
  carouselState?: CarouselInternalState;
}

export const CarouselButtonGroup: React.FC<CarouselButtonGroupProps> = ({
  next,
  previous,
  ...rest
}) => {
  const {
    carouselState: { currentSlide, totalItems },
  } = rest;
  return (
    <ButtonsContainer>
      <div>
        <Button
          $round
          disabled={currentSlide === 0}
          onClick={() => previous?.()}
        >
          <Arrow className="left-arrow" height="54" width="54" />
        </Button>
        <Count>{`0${currentSlide + 1} / 0${totalItems}`}</Count>
        <Button $round onClick={() => next?.()}>
          <Arrow height="54" width="54" />
        </Button>
      </div>
      <Link href="/catalogue?_sort=views:DESC">
        <Button>посмотреть все</Button>
      </Link>
    </ButtonsContainer>
  );
};
