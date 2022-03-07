import styled from "styled-components";
import { device } from "../constants";
import { Box, Container } from "../layout";

export type TabName = "common" | "images" | "result";

export const OrderContainer = styled.form<{ $activeTab: TabName }>`
  ${Container};
  display: grid;
  margin: 0 18px 25rem;
  width: auto;

  & > div {
    overflow: hidden;
    display: flex;
    align-items: stretch;
    flex-direction: column;
    gap: 3.6rem;
  }

  & > div:first-child {
    height: ${({ $activeTab }) => $activeTab === 'common' ? 'auto' : 0};
  }

  & > div:nth-child(2) {
    height: ${({ $activeTab }) => $activeTab === 'images' ? 'auto' : 0};
  }

  & > div:nth-child(3) {
    height: ${({ $activeTab }) => $activeTab === 'result' ? 'auto' : 0};
  }

  @media ${device.laptopL} {
    grid-gap: 3.6rem;
    margin: 0 3.6rem 25rem;

    & ${Box} {
      padding: 3rem;
    }

    & > div:first-child {
      height: auto;
    }

    & > div:nth-child(2) {
      height: auto;
    }

  }

  @media ${device.hd} {
    & ${Box} {
      padding: 6rem;
    }
  }
`;

export const ImageInputsRow = styled.div`
  grid-gap: 1.5rem;
  justify-content: flex-start;
  display: grid;
  flex-wrap: wrap;
  grid-auto-rows: auto;
  justify-content: stretch;
  
  @media ${device.laptopL} {
    grid-template-columns: repeat(6, auto);
    justify-content: flex-start;
  }
`;


export const OfferRow = styled.div`
  display: grid;
  grid-gap: 3.6rem;
  grid-auto-rows: auto;
  
  @media ${device.laptopL} {
    grid-template-columns: repeat(2, 1fr);
  }
`

export const OfferTitle = styled.div`
  margin: 0 18px 30px;

  @media ${device.laptopL} {
    margin: 0 3.6rem;
  }
`

export const MobileButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  margin-top: 16px;
  gap: 16px;
  align-items: stretch;

  & > button {
    justify-content: center;
  }

  & svg {
    transform: rotate(-180deg);
  }

  @media ${device.laptopL} {
    display: none;
  }
`

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.red};
  font-size: 12px;
  letter-spacing: 0.02em;
  margin: 30px 0;
`

export const ResultRow = styled.div`
  font-size: 16px;
  line-height: 120%;
  color: ${({ theme }) => theme.colors.black};

  padding: 11px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
`

export const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minMax(90px, auto));
  grid-gap: 18px;
  margin: 30px 0;

  & > div {
    height: 90px;
    overflow: hidden;
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: stretch;
  }
  
  & img {
    width: 100%;
    border-radius: 18px;

  }
`