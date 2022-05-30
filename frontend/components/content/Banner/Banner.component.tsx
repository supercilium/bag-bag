import React, { FC, useCallback, useMemo } from "react";
import {
  BannerActions,
  BannerContainer,
  BannerDot,
  BannerImage,
  BannerRoot,
  BrandItem,
  BrandsBlock,
  BrandsLine,
  Root,
  TitleText,
} from "./Banner.styles";
import { Button } from "../../Button";
import Arrow from "../../icons/arrow-big-right.svg";
import { BrandWithCount } from "../../../types/brand";
import Link from "next/link";
import { PromotionInterface } from "../../../types/promotion";
import MultiCarousel, { CarouselInternalState } from "react-multi-carousel";
import { chunk } from "lodash-es";

export interface BannerProps {
  brandsWithCounts: BrandWithCount[];
  promotions: PromotionInterface[];
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 0 },
    items: 1,
  },
};

export interface CarouselButtonGroupProps {
  next?: () => void;
  previous?: () => void;
  carouselState?: CarouselInternalState;
}

export interface CarouselDotProps {
  onClick?: () => void;
  active?: boolean;
  index?: number;
}

const DOT_NAMES = ["one", "two", "three", "four"];

const CustomDot: FC<CarouselDotProps> = ({ onClick, active, index }) => {
  return (
    <BannerDot active={active}>
      <button type="button" onClick={() => onClick()}>
        {`${active ? "(" : ""} ${DOT_NAMES[index]} ${active ? ")" : ""}`}
      </button>
    </BannerDot>
  );
};

export const Banner: React.FC<BannerProps> = ({
  brandsWithCounts,
  promotions,
}) => {
  const BannerButtons: FC<CarouselButtonGroupProps> = useCallback(
    ({ next, previous, ...rest }) => {
      const {
        carouselState: { currentSlide },
      } = rest;
      return (
        <BannerActions>
          <Button
            $round
            disabled={currentSlide === 0}
            onClick={() => previous?.()}
          >
            <Arrow className="left-arrow" height="54" width="54" />
          </Button>
          <Button $round onClick={() => next?.()}>
            <Arrow height="54" width="54" />
          </Button>
          <Link
            href={`/promotions?slug=${promotions?.[currentSlide]?.slug}`}
            passHref
          >
            <Button>подробнее</Button>
          </Link>
        </BannerActions>
      );
    },
    [promotions]
  );

  const brandRows = useMemo(
    () => brandsWithCounts.filter((item) => item.products > 0),
    [brandsWithCounts]
  );

  return (
    <Root>
      <BannerRoot>
        <BannerContainer>
          <MultiCarousel
            swipeable={true}
            responsive={responsive}
            draggable={false}
            showDots={true}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={false}
            autoPlaySpeed={100000}
            keyBoardControl={true}
            transitionDuration={500}
            containerClass="banner"
            itemClass="item-class"
            // removeArrowOnDeviceType={["tablet", "mobile"]}
            renderDotsOutside={true}
            customDot={<CustomDot />}
            dotListClass="dot-list"
            partialVisible={false}
            minimumTouchDrag={10}
            arrows={false}
            customButtonGroup={<BannerButtons />}
          >
            {promotions?.map((promo) => (
              <BannerImage key={promo.id} $url={promo?.banner?.url}>
                <TitleText className="h1">
                  {promo.title || promo.name}
                </TitleText>
                <Link href={`/promotions?slug=${promo.slug}`} passHref>
                  <Button $size="m">подробнее</Button>
                </Link>
              </BannerImage>
            ))}
          </MultiCarousel>
        </BannerContainer>
      </BannerRoot>
      <BrandsBlock>
        <BrandsLine className="h3">
          {brandRows?.map((brand) => (
            <>
              <Link
                href={`/catalogue?brand.id=${brand.id}&_sort=views:DESC`}
                key={brand.id}
                passHref
              >
                <BrandItem $preview={brand?.preview?.thumbnail?.url}>
                  {brand.name}
                  <sup>{brand.products}</sup>
                </BrandItem>
              </Link>{" "}
            </>
          ))}
        </BrandsLine>
      </BrandsBlock>
    </Root>
  );
};
