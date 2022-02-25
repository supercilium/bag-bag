import styled from "styled-components";
import { device, TRANSITION } from "../../styles/constants";
import { ButtonProps } from "./Button.component";

const BUTTON_SIZE: Record<ButtonProps["$size"], string> = {
  l: "26.6rem",
  s: "5.4rem",
  m: "8.6rem",
};

const FONT_SIZES_MOBILE: Record<ButtonProps["$size"], string> = {
  s: "3rem",
  m: "3rem",
  l: "5rem",
};

const FONT_SIZES: Record<ButtonProps["$size"], string> = {
  s: "3.6rem",
  m: "5.7rem",
  l: "5.7rem",
};

export const StyledButton = styled.button<{
  $round?: boolean;
  $size?: ButtonProps["$size"];
}>`
  padding: ${({ $round }) => ($round ? 0 : ".7rem 6.9rem 1.1rem")};
  min-width: ${({ $size }) => BUTTON_SIZE[$size]};
  height: ${({ $size }) => BUTTON_SIZE[$size]};
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 9.4rem;
  font-weight: 500;
  font-size: ${({ $size }) => FONT_SIZES_MOBILE[$size]};
  line-height: 6.8rem;
  color: ${({ theme }) => theme.colors.black};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color ${TRANSITION}, color ${TRANSITION},
    border-color ${TRANSITION};
  background-color: ${({ theme }) => theme.colors.white};

  &:hover {
    background-color: ${({ theme }) => theme.colors.green};
    border-color: ${({ theme }) => theme.colors.green};
    color: ${({ theme }) => theme.colors.white};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.black};
    border-color: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
  }

  @media ${device.laptopL} {
    font-size: ${({ $size }) => FONT_SIZES[$size]};
  }
`;
