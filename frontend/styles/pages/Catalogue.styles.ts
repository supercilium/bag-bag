import styled from "styled-components";
import { device, TRANSITION } from "../constants";
import { primaryText } from "../typography";

export const FiltersRoot = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 3.5rem;
  padding: 0 3.6rem;
`

export const FiltersRow = styled.div`
  height: 7rem;
  display: flex;
  align-items: center;
  /* position: sticky; */
  /* top: 0; */
  background-color: #fff;
`;


export const CatalogButton = styled.button<{ $isOpen: boolean }>`
  background: none;
  border: none;
  display: flex;
  text-transform: uppercase;
  ${primaryText};
  font-weight: 500;
  margin-right: 3.6rem;
  color: ${({ theme }) => theme.colors.black};

  &:last-child {
    margin-right: 0;
  }

  & > svg {
    transition: transform ${TRANSITION};
    transform: rotate(${({ $isOpen }) => $isOpen ? '-90deg' : '90deg'});
    padding: 3px;
    margin-left: 6px;
  }
`

export const SortBy = styled(CatalogButton)`
  margin-left: auto;

  & > span {
    color: ${({ theme }) => theme.colors.grey2};
    margin-right: 0.8rem;
  }
`;

export const CatalogueGrid = styled.div`

  @media ${device.laptopL} {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    /* grid-template-rows: repeat(5, 1fr); */
    grid-gap: 3.6rem;
    margin: 6rem 0;
  }
`;

export const CatalogueItem = styled.div<{ $gridArea: string }>`
  margin-bottom: 24px;

  @media ${device.laptopL} {
    margin-bottom: unset;
    grid-area: ${({ $gridArea }) => $gridArea};
  }
`;

export const FiltersForm = styled.form`
  padding-bottom: 3.6rem;
  overflow-y: auto;
  max-height: 54.8rem;
`

export const SelectedFilters = styled.div`
  margin-top: 2.4rem;
  display: flex;
  gap: 9px;

  & > button {
    background-color: ${({ theme }) => theme.colors.grey4};
    color: ${({ theme }) => theme.colors.grey};
    font-size: 1.8rem;
    line-height: 2.2rem;
    border-radius: 9.4rem;
    padding: 3px 1.5rem;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
  }
`

export const CatalogFieldset = styled.fieldset`
  border: none;
  display: grid;
  padding: 0;
  margin: 0;

  & label {
    margin-bottom: 1.8rem;
    font-size: 1.8rem;
    line-height: 2.2rem;
    font-weight: 500;
    cursor: pointer;
  }

  & input {
    display: none;
  }
`

export const LabelCondition = styled.label<{ $selected: boolean }>`
  position: relative;
  color: ${({ theme, $selected }) => $selected ? theme.colors.green : theme.colors.grey};
  padding-left: 28px;

  & svg {
    position: absolute;
    left: 0;
  }
`

export const SortFieldset = styled(CatalogFieldset)`
  grid-template-columns: 36rem;
  justify-content: flex-end;
`

export const InputField = styled.label`
  display: flex;
  text-transform: uppercase;
  ${primaryText};
  gap: 18px;
  align-items: center;
  
  & input {
    appearance: none;
    height: 6.3rem;
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.black};
  }
`

export const PriceRow = styled.div`
  display: flex;
  gap: 18px;
  margin-left: 36rem;
`

export const BrandsFilters = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 32rem);
  grid-gap: 3.8rem;

  & ${InputField} {
    font-weight: 400;
  }
`

export const KeyTitle = styled.div`
  text-transform: uppercase;
  ${primaryText};
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey3};
  margin-bottom: 18px;
  line-height: 23px;
  padding-bottom: 3px;
  font-weight: 500;
`