import styled from "styled-components";
import { device, TRANSITION } from "../../styles/constants";
import { subtitle } from "../../styles/typography";
import Telegram from "../icons/telegram.svg";

export const FooterRoot = styled.footer`
  background-color: ${({ theme }) => theme.colors.black};
  padding: 90px 0;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;

  & > div {
    padding: 0 6rem;
  }

  address {
    line-height: 150%;
    font-style: normal;
    flex-grow: 1;
    color: ${({ theme }) => theme.colors.grey};
    margin: 30px 0;
    font-size: 16px;
    text-transform: none;
  }

  @media ${device.laptopL} {
    display: flex;
    padding: 14.3rem 0 0;
    flex-direction: column;
    justify-content: space-between;
    text-align: left;
    height: 50.4rem;

    address {
      white-space: pre-line;
      color: ${({ theme }) => theme.colors.white};
      margin: 0;
      text-transform: uppercase;
      font-weight: 400;
      font-size: 24px;
      line-height: 150%;
      letter-spacing: 0.02em;
    }
  }
`;

export const FooterBottom = styled.div`
  display: none;

  @media ${device.laptopL} {
    height: 8.9rem;
    gap: 6.3rem;
    border-top: 1px solid ${({ theme }) => theme.colors.white};
    display: flex;
    align-items: center;
  }
`;

export const FooterTop = styled.div`
  @media ${device.laptopL} {
    display: flex;
  }
`;

export const FooterLink = styled.a`
  ${subtitle}
  transition: color ${TRANSITION};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    color: ${({ theme }) => theme.colors.grey3};
  }
`;

export const SocialContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;

  @media ${device.laptopL} {
    margin-bottom: 0;
  }
`

export const SocialLink = styled.a`
  width: 100px;
  height: 100px;
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color ${TRANSITION}, color ${TRANSITION},
    border-color ${TRANSITION};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    color: ${({ theme }) => theme.colors.black};
    background-color: ${({ theme }) => theme.colors.white};
    border-color: ${({ theme }) => theme.colors.white};

    & svg {
      fill: ${({ theme }) => theme.colors.black};
    }
  }

  & svg {
    height: 60px;
    width: 60px;
  }

  @media ${device.laptopL} {
    width: 12.9rem;
    height: 12.9rem;
  }
`;

export const Copyright = styled.span`
  color: ${({ theme }) => theme.colors.grey};
  letter-spacing: 0.03em;
  font-weight: 500;
  font-size: 2.4rem;
  line-height: 140%;
  margin-left: auto;
`;

export const InfoBlock = styled.div`
  gap : 8px;
  display: flex;
  flex-direction: column;

  & > a {
    color: ${({ theme }) => theme.colors.white};
    font-size: 24px;
    line-height: 110%;
  }

  & a[href*="mailto"] {
    font-weight: normal;
  }
  & a[href*="tel"] {
    font-weight: 500;
  }

  @media ${device.laptopL} {
    flex-basis: 46rem;
    margin-right: 6rem;
    gap: 0;

    & > a {
      font-size: 4.8rem;
      line-height: 6.4rem;
    }
  }
`;

export const TelegramIcon = styled(Telegram)`
  position: relative;
  left: -5px;
  top: 4px;
`