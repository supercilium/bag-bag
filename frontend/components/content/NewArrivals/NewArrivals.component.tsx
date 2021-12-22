import React from "react"
import { Button } from "../../Button"
import { Item } from "../../Item"
import { ContentBlock } from "../content.styles"
import { ButtonsContainer, Carousel, Count } from "./NewArrivals.styles"
import Arrow from "../../icons/arrow-big-right.svg"

// export interface NewArrivalsProps {}

export const NewArrivals: React.FC = () => {
  return (
    <ContentBlock>
      <div className="container">
        <h2 className="h1">
          новинки <span>new</span>
        </h2>
        <Carousel>
          {[1, 2, 3, 4].map((item) => (
            <Item key={item} />
          ))}
        </Carousel>
        <ButtonsContainer>
          <div>
            <Button $round>
              <Arrow className="left-arrow" height="54" width="54" />
            </Button>
            <Count>01 / 04</Count>
            <Button $round>
              <Arrow height="54" width="54" />
            </Button>
          </div>
          <Button>посмотреть все</Button>
        </ButtonsContainer>
      </div>
    </ContentBlock>
  )
}
