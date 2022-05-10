import styled from "styled-components"
import { device, TRANSITION } from "../../styles/constants";
import { primaryText } from "../../styles/typography";
import { Button } from "../Button";

export const FiltersRoot = styled.div`
  @media ${device.laptopL} {
    padding: 0 3.6rem;
    border: 1px solid ${({ theme }) => theme.colors.black};
    border-radius: 3.5rem;
    display: block;
    position: relative;
  }
`

export const FilterButtons = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 9px;
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
    margin-top: 3px;
  }
`

export const SortBy = styled(CatalogButton)`
  margin-left: auto;

  & > span {
    color: ${({ theme }) => theme.colors.grey2};
    margin-right: 0.8rem;
  }
`;

export const FiltersForm = styled.form`

    @media ${device.laptopL} {
      padding-bottom: 3.6rem;
      overflow-y: auto;
      max-height: 54.8rem;
      padding-bottom: 98px;
  }
`

export const SelectedFilters = styled.div`
  display: flex;
  gap: 9px;
  margin: 18px 0 24px;
  
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

  @media ${device.laptopL} {
    margin-top: 2.4rem;
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
  margin-top: 22px;

  @media ${device.laptopL} {
      margin-top: 0;
      justify-content: flex-end;
      grid-template-columns: 36rem;
  }
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
    flex-grow: 1;
  }

  @media ${device.laptopL} {
    & input {
        flex-grow: 0;
    }
  }
`

export const PriceRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;


    @media ${device.laptopL} {
        flex-direction: row;
      margin-left: 36rem;
  }
`

export const BrandsFilters = styled.div`
  & ${InputField} {
    font-weight: 400;
  }

  @media ${device.laptopL} {
    display: grid;
    grid-template-columns: repeat(4, 32rem);
    grid-gap: 3.8rem;
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

export const MobileSubmitButton = styled(Button)`
  position: fixed;
  left: 18px;
  right: 18px;
  bottom: 18px;
  z-index: 12;
`

export const LaptopSubmitButton = styled.div`
  display: none;

  @media ${device.laptopL} {
    display: flex;
    justify-content: center;
    padding: 24px 0;
    background-color: ${({ theme }) => theme.colors.white};
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 3.5rem;
  }
`