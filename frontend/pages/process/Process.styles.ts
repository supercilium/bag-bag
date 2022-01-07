import styled from "styled-components";
import { Box } from "../../styles/layout";
import { buttonText, primaryText } from "../../styles/typography";

export const ProcessGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 75rem;
    grid-gap: 3.6rem;
    margin-bottom: 43rem;
    align-items: flex-start;

    & > ${Box} {
        padding: 1.5rem;
    }
`

export const ProcessRow = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 3.6rem;
`

export const SummaryRow = styled.div`
    margin-top: 6rem;

    & button {
        width: 100%;
        margin-top: 6rem;
    }
`

export const NameBlock = styled.div`
    padding: 4.5rem;
`

export const NameTitle = styled.p`
    ${buttonText};
    text-transform: none;
    color: ${({ theme }) => theme.colors.green};
    margin: 0;
`

export const DescriptionBlock = styled.div`
    display: grid;
`

export const Details = styled.div`
    display: grid;
    grid-template-columns: 18rem 1fr;
    grid-gap: 3.6rem;
    align-items: flex-end;
`

export const PriceRow = styled.div`
    ${primaryText};
    text-align: right;
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey3};
    padding-bottom: 1.8rem;
`

export const FullWidthLabel = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`