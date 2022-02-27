import styled from "styled-components";
import { device, TRANSITION } from "../../styles/constants";
import { Container } from "../../styles/layout";
import { subtitle } from "../../styles/typography";

export const NavbarRoot = styled.div`
  position: fixed;
  height: 53px;
  top: 0;
  right: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
  z-index: 2;

  @media ${device.laptopL} {
    height: 9rem;
  }
`;

export const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${Container};
  height: 100%;
`;

export const NavbarActions = styled.div`
  display: flex;
  align-items: center;
  
  & a {
    width: 46px;
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.black};
    transition: color ${TRANSITION};

    & svg {
      height: 24px;
      width: 24px;
    }

    &:hover {
      & svg {
        fill: ${({ theme }) => theme.colors.green};
      }

      color: ${({ theme }) => theme.colors.green};
    }
  }

  @media ${device.laptopL} {
    & a {
      width: 9rem;
      height: 9rem;

      & svg {
        height: 36px;
        width: 36px;
      }
    }
  }
`;

export const NavbarLinks = styled.div`
  display: none;

  @media ${device.laptopL} {
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
  }
`;

export const Logo = styled.a`
  display: block;
  width: 88px;
  height: 21px;
  position: relative;
  margin-left: -42px;
  left: 50%;
  
  @media ${device.laptopL} {
    margin-left: 36px;
    height: 42px;
    width: 173px;
    left: 0;
    justify-self: flex-start;
  }
`
