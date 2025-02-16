import styled from "styled-components";
import { device } from "../../../styles/constants";

export const TitleBlock = styled.div`
  padding-top: 90px;
  color: ${({ theme }) => theme.colors.green};
  text-align: center;
  
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  & h2 {
    margin: 24px 0;
  }
  
  @media ${device.laptopL} {
    border-bottom: 1px solid ${({ theme }) => theme.colors.black};
    padding: 9.5rem 3.6rem 11.8rem;
    text-align: left;

    & h2 {
      margin: 0;
    }

    & > div {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
`;

export const QualityAssuranceTitleImage = styled.div`
  @media ${device.laptopL} {
    flex-shrink: 0;
    margin: 0 11.5rem;
  }
`;

export const ContentBlock = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
  text-align: center;
  padding-bottom: 90px;
  display: flex;
  flex-direction: column;

  & > button {
    margin: 63px 18px 0;
    display: block;
  }
  
  @media ${device.laptopL} {
    padding-bottom: 0;
    text-align: left;

    & > div {
      height: 72rem;
      display: flex;
    }

    & > button {
      display: none;
    }
  }
`;

export const QualityAssuranceBannerContainer = styled.div`
  @media ${device.laptopL} {
    border-right: 1px solid ${({ theme }) => theme.colors.black};
    padding: 1.5rem;
    flex-basis: 127.4rem;
    min-width: 127.4rem;
  }
`;

export const QualityAssuranceContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${device.laptopL} {
    padding: 0 7.5rem;
  }
`;

export const QualityAssuranceBanner = styled.div<{ $url: string }>`
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)),
    linear-gradient(0deg, rgba(143, 153, 189, 0.44), rgba(143, 153, 189, 0.44)),
    linear-gradient(0deg, rgba(167, 213, 239, 0.24), rgba(167, 213, 239, 0.24)),
    url(${({ $url }) => $url}), #ebebeb;
  background-blend-mode: normal, overlay, multiply, normal, normal;
  background-size: auto, auto, auto, cover, auto;
  border-radius: 6rem;
  height: 100%;
`;
