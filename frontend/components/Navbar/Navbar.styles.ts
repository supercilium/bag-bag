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

export const BagContainer = styled.a`
  & > span {
    display: block;
    position: relative;
  }

  & b {
    font-family: Graphik LC, sans-serif;
    position: absolute;
    width: 11px;
    height: 11px;
    line-height: 140.5%;
    letter-spacing: 0.045em;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 3px;
    right: 1px;
    font-weight: 600;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.green};
  }

  @media ${device.laptopL} {
    & b {
      width: 16px;
      height: 16px;
      line-height: 16px;
      bottom: 5px;
      right: 2px;
      font-size: 21px;
    }
  }
`

export const NavbarMainLink = styled.a<{ $selected: boolean }>`
  color: ${({ theme, $selected }) => $selected ? theme.colors.green : theme.colors.black};
  position: relative;
  display: inline-block;
  padding: 11px 18px;
  transition: color ${TRANSITION};

  &:hover {
    color: ${({ theme }) => theme.colors.green};
  }

  & > svg {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    
    & path {
      transition: stroke-dashoffset .5s ease-in-out;
      stroke-dasharray: 450;
      stroke-dashoffset: 450;
    }
  }

  &:nth-child(even) > svg {
    left: 18px;
    right: 18px;
  }

  &:hover > svg path {
    stroke-dashoffset: 0;
  }
`