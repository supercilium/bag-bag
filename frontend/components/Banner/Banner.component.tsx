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

export interface BannerProps {}

export const Banner: React.FC<BannerProps> = (props) => {
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
        <BrandsLine className="h3">
          <span>Gucci</span>
          <span>Bottega Veneta</span>
          <span>Michael Kors</span>
          <span>Christian Dior</span>
          <span>Hermes</span>
          <span>Gucci</span>
        </BrandsLine>
        <BrandsLine className="h3">
          <span>Gucci</span>
          <span>Bottega Veneta</span>
          <span>Michael Kors</span>
          <span>Christian Dior</span>
          <span>Hermes</span>
          <span>Gucci</span>
        </BrandsLine>
        <BrandsLine className="h3">
          <span>Gucci</span>
          <span>Bottega Veneta</span>
          <span>Michael Kors</span>
          <span>Christian Dior</span>
          <span>Hermes</span>
          <span>Gucci</span>
        </BrandsLine>
      </BrandsBlock>
    </>
  );
};
