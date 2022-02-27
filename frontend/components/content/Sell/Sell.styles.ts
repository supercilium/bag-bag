import styled from "styled-components";
import { device } from "../../../styles/constants";
import { Container } from "../../../styles/layout";

export const SellRoot = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};

  & h3 {
    text-align: center;
    margin: 24px 0;
  }

  @media ${device.laptopL} {
    & h3 {
      text-align: left;
    }
  }
`;

export const SellBlock = styled.div`
  ${Container}
  color: ${({ theme }) => theme.colors.green};

  & > div:first-child {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    padding-bottom: 6rem;

    & h3 {
      padding: 0 6.6rem;
    }
  }
  & > div:last-child {
    background-color: ${({ theme }) => theme.colors.greenLight};
    border-top: 1px solid ${({ theme }) => theme.colors.black};
    
    & > div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: 4.2rem 6rem 6rem;
      border-radius: 60px;
      border: 1px solid${({ theme }) => theme.colors.black};

      & > h3 + div {
        order: -1;
      }
    }
  }

  @media ${device.laptopL} {
    display: flex;
    align-items: stretch;
    min-height: 108.3rem;

    & > div:first-child {
      flex-basis: 34%;
      border-right: 1px solid ${({ theme }) => theme.colors.black};
    }

    & > div:last-child {
      flex-basis: 66%;
      max-width: 66%;
      border-top: none;

      & > div {
        border: none;
        border-radius: none;

        & > h3 + div {
          order: 0;
        }
      }
    }
  }
`;

export const SellButtons = styled.div`
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-direction: column-reverse;
  gap: 63px;

  & > p {
    margin: 0;
  }
  @media ${device.laptopL} {
    gap: 0;
    display: grid;
    grid-template-columns: 55rem minMax(auto, 51.1rem);
    grid-gap: 9.7rem;
    margin-top: 6.8rem;
  }
`;
