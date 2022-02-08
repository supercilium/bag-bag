import styled from "styled-components";
import { primaryText } from "../../styles/typography";

export const FiltersRow = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.black};
  height: 7rem;
  border-radius: 3.5rem;
  display: flex;
  align-items: center;
  padding: 0 3.6rem;

  & > div {
    text-transform: uppercase;
    ${primaryText};
    font-weight: 500;
    margin-right: 3.6rem;
    color: ${({ theme }) => theme.colors.black};

    &:last-child {
      margin-right: 0;
    }
  }
`;

export const SortBy = styled.div`
  margin-left: auto;

  & > span {
    color: ${({ theme }) => theme.colors.grey2};
    margin-right: 0.8rem;
  }
`;

export const CatalogueGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  /* grid-template-rows: repeat(5, 1fr); */
  grid-gap: 3.6rem;
  margin: 6rem 0;
`;

export const CatalogueItem = styled.div<{ $gridArea: string }>`
  grid-area: ${({ $gridArea }) => $gridArea};
`;
