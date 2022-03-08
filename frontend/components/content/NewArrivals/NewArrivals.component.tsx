import React, { useMemo } from "react";
import MultiCarousel from "react-multi-carousel";
import chunk from "lodash-es/chunk";
import { Item } from "../../Item";
import { Carousel, Root } from "./NewArrivals.styles";
import { ProductInterface } from "../../../types/product";
import { useDimensions } from "../../../hooks/useDimensions";
import { size } from "../../../styles/constants";
import { CarouselButtonGroup } from "../../CarouselButtonGroup";
import "react-multi-carousel/lib/styles.css";

export interface NewArrivalsProps {
  products: ProductInterface[];
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 465 },
    items: 1,
  },
};

export const NewArrivals: React.FC<NewArrivalsProps> = ({ products }) => {
  const screenSize = useDimensions();
  const isWideScreen = screenSize.width >= size.laptop;

  const carouselItems = useMemo(() => {
    if (isWideScreen && products && products?.length >= 0) {
      return chunk(products, 4);
    }
  }, [products, isWideScreen]);

  return (
    <Root>
      <div className="container">
        <h2 className="h1">
          новинки <span>new</span>
        </h2>
        {isWideScreen ? (
          <MultiCarousel
            swipeable={true}
            responsive={responsive}
            draggable={false}
            showDots={false}
            ssr={true} // means to render carousel on server-side.
            infinite={false}
            autoPlay={false}
            autoPlaySpeed={100000}
            keyBoardControl={true}
            transitionDuration={500}
            // removeArrowOnDeviceType={["tablet", "mobile"]}
            // customLeftArrow={<CustomLeftArrow />}
            // customRightArrow={<CustomRightArrow />}
            // customDot={<CustomDotComponent />}
            partialVisible={false}
            minimumTouchDrag={10}
            renderButtonGroupOutside={true}
            arrows={false}
            customButtonGroup={<CarouselButtonGroup />}
          >
            {carouselItems.map((chunk, i) => (
              <Carousel key={i}>
                {chunk.map((item) => (
                  <Item {...item} key={item.slug} />
                ))}
              </Carousel>
            ))}
          </MultiCarousel>
        ) : (
          <Carousel>
            {products.map((item) => (
              <Item {...item} key={item.slug} />
            ))}
          </Carousel>
        )}
      </div>
    </Root>
  );
};
