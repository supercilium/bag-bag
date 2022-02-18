import React from "react";
import {
  BannerActions,
  BannerAside,
  BannerContainer,
  BannerImage,
  BannerImageContainer,
  BannerRoot,
  BrandsBlock,
  BrandsLine,
  FloatingImage,
} from "./Banner.styles";
import { Button } from "../Button";
import Star from "../icons/star2.svg";
import Arrow from "../icons/arrow-big-right.svg";
import NextImage from "../Image";
import { BrandWithCount } from "../../types/brand";
import Link from "next/link";

export interface BannerProps {
  brandsWithCounts: BrandWithCount[];
}

export const Banner: React.FC<BannerProps> = ({ brandsWithCounts }) => {
  return (
    <>
      <BannerRoot>
        <BannerContainer>
          <BannerImageContainer>
            <BannerImage $url="/banner.jpg">
              <h1>
                новое поступление <i>из милана</i>
              </h1>
              <div>
                <Star />
                <BannerActions>
                  <Button $round>
                    <Arrow className="left-arrow" height="54" width="54" />
                  </Button>
                  <Button $round>
                    <Arrow height="54" width="54" />
                  </Button>
                  <Button>подробнее</Button>
                </BannerActions>
              </div>
            </BannerImage>
          </BannerImageContainer>
          <BannerAside>1</BannerAside>
        </BannerContainer>
      </BannerRoot>
      <BrandsBlock>
        <FloatingImage>
          <NextImage src="/floating-bag.png" width="330" height="330" />
        </FloatingImage>
        {[1, 2, 3].map((row) => (
          <BrandsLine key={row} className="h3">
            {brandsWithCounts?.map((brand) => (
              <Link href={`/catalogue?brand.id=${brand.id}`} key={brand.id}>
                <span>
                  {brand.name}
                  {brand.products > 0 && <sup>{brand.products}</sup>}
                </span>
              </Link>
            ))}
          </BrandsLine>
        ))}
      </BrandsBlock>
    </>
  );
};
