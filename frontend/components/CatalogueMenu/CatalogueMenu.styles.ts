import styled from "styled-components"
import { device, TRANSITION } from "../../styles/constants"
import { primaryText } from "../../styles/typography"

export const CatalogueMenuRoot = styled.div<{ $isOpen: boolean }>`
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 0px 0px 36px 36px;
    box-shadow: 0px 15px 21px rgba(0, 0, 0, ${({ $isOpen }) => $isOpen ? '0.09' : '0'});
    padding: 3.6rem;
    grid-template-columns: minMax(0, 43.5rem) repeat(3, minMax(0, 38.3rem));
    grid-gap: 3.6rem;
    min-height: 60rem;
    display: none;
    transform: translateY(${({ $isOpen }) => $isOpen ? 0 : '-100%'});
    transition: transform ${TRANSITION}, box-shadow 0.1s ease-out .2s;
    position: fixed;
    top: 9rem;
    z-index: 1;
    
    @media ${device.laptopL} {
        display: grid;
    }
`

export const ImageContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)),
    linear-gradient(0deg, rgba(143, 153, 189, 0.31), rgba(143, 153, 189, 0.31)),
    linear-gradient(0deg, rgba(167, 213, 239, 0.17), rgba(167, 213, 239, 0.17));
    border-radius: 3.6rem;

    & img {
        border-radius: 3.6rem;
    }
`

export const PreviewColumn = styled.div`
    width: 100%;
    height: 52.8rem;
    border: 1px solid ${({ theme }) => theme.colors.black};
    padding: 15px;
    border-radius: 3.6rem;
    display: flex;
    align-items: flex-end;
`

export const CategoryTitlePreview = styled.div`
    position: absolute;
    padding: 1.7rem 3.6rem 1.9rem;
    left: 15px;
    right: 15px;
    bottom: 15px;
    border: 1px solid ${({ theme }) => theme.colors.black};
    border-radius: 9.4rem;
    font-weight: 500;
    font-size: 2.4rem;
    line-height: 1;
    color: ${({ theme }) => theme.colors.black};
    transition: background-color ${TRANSITION}, color ${TRANSITION},
        border-color ${TRANSITION};
    background-color: ${({ theme }) => theme.colors.white};
    letter-spacing: 0.02em;
    text-transform: uppercase;

    @media (hover: hover) and (pointer: fine) {
        &:not([disabled]):hover {
        background-color: ${({ theme }) => theme.colors.green};
        border-color: ${({ theme }) => theme.colors.green};
        color: ${({ theme }) => theme.colors.white};
        }

        &:not([disabled]):active {
        background-color: ${({ theme }) => theme.colors.black};
        border-color: ${({ theme }) => theme.colors.black};
        color: ${({ theme }) => theme.colors.white};
        }
    }

    &[disabled] {
        color: ${({ theme }) => theme.colors.grey2};
        border-color: ${({ theme }) => theme.colors.grey2};
        cursor: auto;
    }
`

export const CatalogueColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;

    & > a {
        ${primaryText};
        line-height: 1;
        color: ${({ theme }) => theme.colors.grey};
        transition: color ${TRANSITION};

        &:hover {
            color: ${({ theme }) => theme.colors.black};
        }
    }

`

export const KeyTitle = styled.div`
  text-transform: uppercase;
  ${primaryText};
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey3};
  margin-bottom: 18px;
  line-height: 22px;
  padding-bottom: 15px;
  font-weight: 500;
  letter-spacing: 0.03em;
`