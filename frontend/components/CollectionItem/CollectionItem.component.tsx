import React from "react";
import {
  CollectionItemRoot,
  Description,
  ImageContainer,
  Tag,
} from "./CollectionItem.styles";
import NextImage from "../Image";
import { CollectionInterface } from "../../types/collection";
import Link from "next/link";

export interface CollectionItemProps extends CollectionInterface {
  halfHeight?: boolean;
}

export const CollectionItem: React.FC<CollectionItemProps> = ({
  halfHeight,
  ...item
}) => {
  return (
    <Link href={`/collections/${item.slug}`}>
      <CollectionItemRoot $halfHeight={halfHeight}>
        <ImageContainer>
          <NextImage
            media={item.preview}
            height={halfHeight ? 327 : 732}
            layout="fill"
            objectFit="cover"
          />
        </ImageContainer>
        <h4>
          {item.name}
          <br />
          <Description>{item.description}</Description>
        </h4>
        <Tag>{item.season}</Tag>
      </CollectionItemRoot>
    </Link>
  );
};
