import React from "react";
import { CollectionItem } from "../../CollectionItem";
import { ContentBlock } from "../content.styles";
import { BigButton, CollectionList, RightColumn } from "./Collections.styles";
import Arrow from "../../icons/arrow-simple-right.svg";
import Link from "next/link";
import { CollectionInterface } from "../../../types/collection";

export interface CollectionsProps {
  items: CollectionInterface[];
}

export const Collections: React.FC<CollectionsProps> = ({ items }) => {
  return (
    <ContentBlock $hidePaddings={true}>
      <div className="container">
        <h2 className="h1">
          коллекции<span>collection</span>
        </h2>
        <CollectionList>
          {items?.slice(0, 2).map((item) => (
            <CollectionItem key={item.id} {...item} />
          ))}
          <RightColumn>
            <CollectionItem halfHeight {...items?.[2]} />
            <Link href="/collections">
              <BigButton $round $size="l">
                еще
                <Arrow width="36" height="36" />
              </BigButton>
            </Link>
          </RightColumn>
        </CollectionList>
      </div>
    </ContentBlock>
  );
};
