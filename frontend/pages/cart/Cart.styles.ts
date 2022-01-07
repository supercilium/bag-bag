import styled from "styled-components";
import { buttonText, PreviousPrice, primaryText } from "../../styles/typography";

export const StyledHeader = styled.header`
    position: relative;

    h1 {
        display: flex;
        align-items: flex-end;
        text-align: center;
        color: ${({ theme }) => theme.colors.green};

        i {
            margin-left: 1rem;
        }
    }

    button {
        border: none;
        background: none;
        position: absolute;
        right: 0;
        top: 50%;
    }
`

export const MainContent = styled.main`
    border: 1px solid ${({ theme }) => theme.colors.black};
    border-radius: 3.6rem;
    padding: 0 1.5rem;
    margin-bottom: 7rem;
`

export const CartItem = styled.div`
    display: flex;
    padding: 1.5rem 0;

    & > div:first-child {
        flex-shrink: 0;
    }

    & + & {
        border-top: 1px solid ${({ theme }) => theme.colors.black};
    }
`

export const CartHeader = styled.h4`
    ${buttonText};
    margin: 0 0 3.8rem;
    line-height: 110%;
    text-transform: capitalize;
    color: ${({ theme }) => theme.colors.green};
`

export const Left = styled.div`
    margin: 4.5rem 6rem;
    width: 100%;
`

export const TopBlock = styled.div`
    display: flex;
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey3};
    padding-bottom: 3.6rem;
    
    & > div {
        flex-basis: 50%;
    }
`

export const BottomBlock = styled.div`
    display: flex;
    padding-top: 3.6rem;

    ${PreviousPrice} {
        ${primaryText};
        margin-right: 3.6rem;
    }

    & > button {
        margin-left: auto;
    }
`

export const Description = styled.div`
    display: grid;
    `

export const DescriptionRow = styled.div`
    ${primaryText};
    display: flex;
`

export const Attribute = styled.span`
    flex-basis: 10rem;
    color: ${({ theme }) => theme.colors.grey2};
`

export const Summary = styled.div`
    width: 90rem;
    margin-left: auto;
    margin-bottom: 22.5rem;

    & > button {
        width: 100%;
    }
`

export const SummaryTop = styled.div`
    display: flex;
    padding-bottom: 6rem;
    margin-bottom: 6rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey3};

     & > * {
        margin-top: 0;
        flex-basis: 50%;
     }
`

export const PriceSummary = styled.div`
    ${primaryText};
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: space-between;

    & > span:nth-child(even) {
        text-align: right;
    }
`