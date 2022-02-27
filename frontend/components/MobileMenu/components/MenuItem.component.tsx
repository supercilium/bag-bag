import { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import { buttonText } from "../../../styles/typography";
import Arrow from "../../icons/arrow-simple-right.svg";

export const MenuItemRoot = styled.button`
  appearance: none;
  border: none;
  background: none;
  display: flex;
  width: 100%;
  text-align: left;
  padding: 30px 0 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey3};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black};

  ${buttonText};
  font-size: 18px;
  line-height: 22px;

  & svg {
    height: 22px;
    width: 22px;
    margin-left: auto;
  }
`;

export const MenuItem: FC<HTMLAttributes<HTMLButtonElement>> = ({
  children,
  onClick,
}) => {
  return (
    <MenuItemRoot onClick={onClick}>
      {children}
      <Arrow />
    </MenuItemRoot>
  );
};
