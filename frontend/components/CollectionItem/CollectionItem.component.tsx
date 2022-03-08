import React from "react";
import {
  CollectionBanner,
  CollectionItemRoot,
  Description,
  ImageContainer,
  Tag,
  TagColumn,
} from "./CollectionItem.styles";
import NextImage from "../Image";
import { CollectionInterface } from "../../types/collection";
import Link from "next/link";
import Leto from "../icons/leto.svg";

export interface CollectionItemProps extends CollectionInterface {
  halfHeight?: boolean;
}

export const CollectionItem: React.FC<CollectionItemProps> = ({
  halfHeight,
  ...item
}) => {
  return (
    <Link href={`/collection/${item.slug}`}>
      <CollectionItemRoot $halfHeight={halfHeight}>
        <CollectionBanner>
          <ImageContainer>
            <NextImage
              media={item.preview}
              height={halfHeight ? 327 : 732}
              layout="fill"
              objectFit="cover"
            />
          </ImageContainer>
          <TagColumn>
            {[0, 1, 2, 3, 4].map((key) => (
              <>
                <Leto width="22" height="22" />
                <span key={key}>{item.season}</span>
              </>
            ))}
          </TagColumn>
        </CollectionBanner>
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
