import styled from "styled-components";
import { device } from "../../../styles/constants";
import { Container } from "../../../styles/layout";

export const SellRoot = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
`;

export const SellBlock = styled.div`
  ${Container}
  color: ${({ theme }) => theme.colors.green};

  & > div:first-child {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-right: 1px solid ${({ theme }) => theme.colors.black};
    flex-shrink: 0;
    padding-bottom: 6rem;

    & h3 {
      padding: 0 6.6rem;
    }
  }
  & > div:last-child {
    padding: 4.2rem 6rem 6rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.colors.greenLight};
  }

  @media ${device.laptopL} {
    display: flex;
    align-items: stretch;
    min-height: 108.3rem;

    & > div:first-child {
      flex-basis: 34%;
    }

    & > div:last-child {
      flex-basis: 66%;
      max-width: 66%;
    }
  }
`;

export const SellButtons = styled.div`
  justify-content: space-between;
  align-items: center;
  margin-top: 6.8rem;

  & > p {
    margin: 0;
  }
  @media ${device.laptopL} {
    display: grid;
    grid-template-columns: 55rem minMax(auto, 51.1rem);
    grid-gap: 9.7rem;
  }
`;
