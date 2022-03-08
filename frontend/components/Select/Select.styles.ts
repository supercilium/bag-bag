import styled from "styled-components";
import { TRANSITION } from "../../styles/constants";
import { subtitle } from "../../styles/typography";

export const SelectBlock = styled.div`
  position: relative;
  height: 9rem;

  & > label {
    ${subtitle}
  }

  & > svg {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 2.2rem;
      height: 2.2rem;
      margin: 2.6rem 0;
      transform: rotate(90deg);
      transition: transform ${TRANSITION};
  }

  &:focus-within > svg {
    transform: rotate(-90deg);
  }
`;

export const SelectRoot = styled.select`
  display: block;
  width: 100%;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
  height: 6.3rem;
  appearance: none;
  background: none;
`;
