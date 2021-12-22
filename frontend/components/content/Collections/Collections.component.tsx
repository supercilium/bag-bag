import React from "react"
import { Button } from "../../Button"
import { CollectionItem } from "../../CollectionItem"
import { ContentBlock } from "../content.styles"
import { BigButton, CollectionList, RightColumn } from "./Collections.styles"
import Arrow from "../../icons/arrow-simple-right.svg"
// export interface CollectionsProps {};

export const Collections: React.FC = () => {
  return (
    <ContentBlock>
      <div className="container">
        <h2 className="h1">
          коллекции<span>collection</span>
        </h2>
        <CollectionList>
          {[1, 2].map((item) => (
            <CollectionItem key={item} />
          ))}
          <RightColumn>
            <CollectionItem halfHeight />
            <BigButton $round>
              еще
              <Arrow width="36" height="36" />
            </BigButton>
          </RightColumn>
        </CollectionList>
      </div>
    </ContentBlock>
  )
}
