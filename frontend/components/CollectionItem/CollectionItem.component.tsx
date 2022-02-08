import React from "react";
import { CollectionItemRoot, Tag } from "./CollectionItem.styles";
import NextImage from "../Image";

export interface CollectionItemProps {
  halfHeight?: boolean;
}

export const CollectionItem: React.FC<CollectionItemProps> = ({
  halfHeight,
}) => {
  return (
    <CollectionItemRoot $halfHeight={halfHeight}>
      <NextImage
        src="/dummy-collection.png"
        alt="Купим вашу сумку"
        height={halfHeight ? 327 : 732}
        width="592"
        className="image"
      />
      <h4>
        ликвидация
        <br />
        -15% на все зимние сумки
      </h4>
      <Tag>ЗИМА</Tag>
    </CollectionItemRoot>
  );
};
