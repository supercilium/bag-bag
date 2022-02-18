import styled from "styled-components";
import { primaryText } from "../../styles/typography";

export const FiltersRoot = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 3.5rem;
  padding: 0 3.6rem;
`

export const FiltersRow = styled.div`
  height: 7rem;
  display: flex;
  align-items: center;

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

export const FiltersForm = styled.form`
  padding-bottom: 3.6rem;
`

export const SelectedFilters = styled.div`
  margin-top: 2.4rem;

  & > button {
    background-color: ${({ theme }) => theme.colors.grey4};
    color: ${({ theme }) => theme.colors.grey};
    font-size: 1.8rem;
    line-height: 2.2rem;
    border-radius: 9.4rem;
    padding: 3px 1.5rem;
    border: none;
    cursor: pointer;
  }

  & > button + button {
    margin-left: 9px;
  }
`