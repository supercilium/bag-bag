import styled from "styled-components";
import { device, TRANSITION } from "../../styles/constants";

export const MenuIconRoot = styled.button<{
  $isOpen: boolean;
}>`
  width: 48px;
  height: 48px;
  padding: 12px;
  border: none;
  background: none;
  appearance: none;
  position: fixed;
  z-index: 11;
  top: 2px;
  left: 0;

  & > div {
    overflow: clip;
    width: ${({ $isOpen }) => ($isOpen ? "17px" : "24px")};
    height: ${({ $isOpen }) => ($isOpen ? "17px" : "24px")};
    display: grid;
    grid-template-rows: repeat(2, 2px);
    grid-gap: ${({ $isOpen }) => ($isOpen ? "0" : "8px")};
    padding: 0;
    align-content: center;
    transition: grid-gap ${TRANSITION};

    & > span {
      display: inline-block;
      height: 2px;
      width: ${({ $isOpen }) => ($isOpen ? "21.5px" : "100%")};
      background-color: ${({ theme }) => theme.colors.black};
      transition: transform ${TRANSITION}, background-color ${TRANSITION},
        width ${TRANSITION};
      border-radius: 1px;
    }

    & > span:first-child {
      transform: ${({ $isOpen }) =>
    $isOpen ? "rotate(-45deg) translate(-2px, -1px)" : ""};
    }

    & > span:last-child {
      transform: ${({ $isOpen }) =>
    $isOpen ? "rotate(45deg) translate(-2px, 1px)" : ""};
    }
  }

  @media ${device.laptopL} {
    display: none;
  }
`;
