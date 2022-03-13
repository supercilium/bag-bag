import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { device, size } from "../constants";
import { buttonText, PreviousPrice, primaryText } from "../typography";

export type ActiveTab = "shipping" | "payment" | "result";

export const ProductsList = styled.div`
  & > div + div {
    margin-top: 3.6rem;
  }

  @media (max-width: ${size.laptopL}px) {
    & > div {
      padding: 1.5rem;
      display: grid;
      grid-template-columns: 100px auto;
    }
  } 
`

export const PaymentBlock = styled.div`
  @media (max-width: ${size.laptopL}px) {
    order: -1;
    margin-bottom: 18px;
  }
  @media ${device.laptopL} {
    display: none;
  }
`

export const SummaryRow = styled.div`
  margin-top: 6rem;

  & button {
    width: 100%;
    margin-top: 6rem;
  }
`;

export const ProcessGrid = styled.div<{ $activeTab: ActiveTab }>`
  margin-bottom: 43rem;
  align-items: flex-start;
  margin-top: 30px;
  display: grid;
  
  @media ${device.laptopL} {
    grid-template-columns: 1fr 75rem;
    grid-gap: 3.6rem;
    margin-top: 0;

    & > ${SummaryRow} {
      display: none;
    }
  }

  @media (max-width: ${size.laptopL}px) {
    & > div {
      overflow: hidden;

      & > ${SummaryRow} {
        display: none;
      }
    }

    & > div:first-child {
      order: -1;
      margin-bottom: 18px;
      height: ${({ $activeTab }) => $activeTab === 'shipping' ? 'auto' : 0};
    }

    & > div:last-child {
      order: -1;
    }

    & > ${PaymentBlock} {
      height: ${({ $activeTab }) => $activeTab === 'payment' ? 'auto' : 0};
    }
  } 
`;

export const ProcessRow = styled.div`
  display: grid;
  grid-gap: 3.6rem;
  
  @media ${device.laptopL} {
    grid-template-columns: repeat(2, 1fr);

  }
`;

export const NameBlock = styled.div`
  @media ${device.laptopL} {
    padding: 4.5rem;
  }
`;

export const NameTitle = styled.p`
  text-transform: none;
  margin: 0;
  font-size: 16px;
  line-height: 120%;
  
  @media ${device.laptopL} {
    ${buttonText};
    color: ${({ theme }) => theme.colors.green};
  }
`;

export const DescriptionBlock = styled.div`
  display: none;
  @media ${device.laptopL} {
    display: grid;
  }
`;

export const Details = styled.div`
  @media ${device.laptopL} {
    display: grid;
    grid-template-columns: 18rem 1fr;
    grid-gap: 3.6rem;
    align-items: flex-end;
  }
`;

export const PriceRow = styled.div`
  ${primaryText};
  margin-top: 9px;

  & ${PreviousPrice} {
    margin-right: 6px;
  }
  
  @media ${device.laptopL} {
    text-align: right;
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey3};
    padding-bottom: 1.8rem;
    margin-tops: 0;
  }
`;

export const FullWidthLabel = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;


export const DescriptionText = styled(ReactMarkdown)`
  ${primaryText};
  
  @media (max-width: ${size.laptopL}px) {
    max-height: 28px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const ImageContainer = styled.div`
  position: relative;
  height: 100px;
  width: 100px;
  
  & img {
    border-radius: 2.4rem;
  }
  
  @media ${device.laptopL} {
    width: 100%;
    height: 58.1rem;
  }
`

export const ButtonsBlock = styled.div`
  display: flex;
  justify-content: stretch;
  flex-direction: column;
  margin-top: 30px;
  text-align: center;

  & svg {
    transform: rotate(-180deg);
  }

  & button + button {
    justify-content: center;
  }

  @media ${device.laptopL} {
    display: none;
  }
`