import styled from "styled-components";
import { TRANSITION } from "../../styles/constants";
import { Container } from "../../styles/layout";
import { subtitle } from "../../styles/typography";

export const NavbarRoot = styled.div`
  height: 9rem;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
  z-index: 1;
`;

export const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${Container}
`;

export const NavbarActions = styled.div`
  display: flex;

  & a {
    width: 9rem;
    height: 9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.black};
    transition: color ${TRANSITION};

    &:hover {
      & svg {
        fill: ${({ theme }) => theme.colors.green};
      }

      color: ${({ theme }) => theme.colors.green};
    }
  }
`;

export const NavbarLinks = styled.div`
  display: flex;
  ${subtitle}
  justify-self: center;

  a {
    color: ${({ theme }) => theme.colors.black};
    margin: 0 1.8rem;
    transition: color ${TRANSITION};

    &:hover {
      color: ${({ theme }) => theme.colors.green};
    }
  }
`;
