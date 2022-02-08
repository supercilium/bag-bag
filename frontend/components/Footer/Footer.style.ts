import styled from "styled-components";
import { TRANSITION } from "../../styles/constants";
import { subtitle } from "../../styles/typography";

export const FooterRoot = styled.footer`
  height: 50.4rem;
  background-color: ${({ theme }) => theme.colors.black};
  padding: 14.3rem 0 0;
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > div {
    padding: 0 6rem;
  }

  address {
    line-height: 150%;
    font-style: normal;
    flex-grow: 1;
    white-space: pre-line;
  }
`;

export const FooterEmail = styled.div`
  font-family: "New York Extra Large", sans-serif;
  font-size: 4.8rem;
  line-height: 140%;
  font-style: italic;
`;

export const FooterBottom = styled.div`
  height: 8.9rem;
  border-top: 1px solid ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
`;

export const FooterTop = styled.div`
  display: flex;
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
  width: 12.9rem;
  height: 12.9rem;
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color ${TRANSITION}, color ${TRANSITION},
    border-color ${TRANSITION};

  &:hover {
    color: ${({ theme }) => theme.colors.black};
    background-color: ${({ theme }) => theme.colors.white};
    border-color: ${({ theme }) => theme.colors.white};

    & svg {
      fill: ${({ theme }) => theme.colors.black};
    }
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
  flex-basis: 46rem;
  margin-right: 6rem;
`;
