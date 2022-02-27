import styled from "styled-components";
import { device, TRANSITION } from "../../styles/constants";
import { subtitle } from "../../styles/typography";

export const FooterRoot = styled.footer`
  background-color: ${({ theme }) => theme.colors.black};
  padding: 14.3rem 0 0;
  color: ${({ theme }) => theme.colors.white};

  & > div {
    padding: 0 6rem;
  }

  address {
    line-height: 150%;
    font-style: normal;
    flex-grow: 1;
    white-space: pre-line;
  }

  @media ${device.laptopL} {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: 50.4rem;
  }
`;

export const FooterEmail = styled.div`
  font-family: "New York Extra Large", sans-serif;
  font-size: 4.8rem;
  line-height: 140%;
  font-style: italic;
`;

export const FooterBottom = styled.div`
  display: none;

  @media ${device.laptopL} {
    height: 8.9rem;
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
  margin-right: 6.3rem;
  transition: color ${TRANSITION};

  &:hover {
    color: ${({ theme }) => theme.colors.grey3};
  }
`;

export const SocialLink = styled.a`
  width: 10rem;
  height: 10rem;
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

  @media ${device.laptopL} {
    flex-basis: 46rem;
    margin-right: 6rem;
  }
`;
