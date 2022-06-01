import Link from "next/link";
import { useState } from "react";
import useFilters from "../../hooks/useFilters";
import { CategoryInterface } from "../../types/common";
import {
  CatalogueColumn,
  CatalogueMenuRoot,
  CategoryTitlePreview,
  ImageContainer,
  KeyTitle,
  PreviewColumn,
} from "./CatalogueMenu.styles";
import NextImage from "../Image";

export interface CatalogueMenuProps {
  isOpen: boolean;
}

export const CatalogueMenu: React.FC<CatalogueMenuProps> = ({ isOpen }) => {
  const { filters } = useFilters();
  const [superUsefulLink, setSuperUsefulLink] =
    useState<CategoryInterface>(null);

  return (
    <CatalogueMenuRoot $isOpen={isOpen}>
      <div>
        {superUsefulLink && (
          <Link
            href={`/catalogue?category.id=${superUsefulLink.id}&_sort=views:DESC`}
            passHref
          >
            <PreviewColumn>
              <ImageContainer>
                {superUsefulLink.preview && (
                  <NextImage
                    media={superUsefulLink.preview}
                    layout="fill"
                    objectFit="cover"
                  />
                )}
                <CategoryTitlePreview>
                  {superUsefulLink.name}
                </CategoryTitlePreview>
              </ImageContainer>
            </PreviewColumn>
          </Link>
        )}
      </div>
      <CatalogueColumn>
        {filters?.categories?.map((item) => (
          <Link
            key={item.slug}
            href={`/catalogue?category.id=${item.id}&_sort=views:DESC`}
          >
            <a onMouseEnter={() => setSuperUsefulLink(item)}>{item.name}</a>
          </Link>
        ))}
        <Link href={`/catalogue?_sort=views:DESC`}>Все сумки</Link>
      </CatalogueColumn>
      <CatalogueColumn>
        <KeyTitle>коллекции</KeyTitle>
        {filters?.collections?.map((item) => (
          <Link key={item.slug} href={`/collection/${item.slug}`}>
            {item.name}
          </Link>
        ))}
      </CatalogueColumn>
      <CatalogueColumn>
        <KeyTitle>бренды</KeyTitle>
        {filters?.brands?.slice(0, 6).map((item) => (
          <Link
            key={item.slug}
            href={`/catalogue?brand.id=${item.id}&_sort=views:DESC`}
          >
            {item.name}
          </Link>
        ))}
        <Link href={`/catalogue?_sort=views:DESC`}>Все сумки</Link>
      </CatalogueColumn>
    </CatalogueMenuRoot>
  );
};
