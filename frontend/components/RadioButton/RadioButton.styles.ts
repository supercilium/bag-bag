import styled from "styled-components";
import { TRANSITION } from "../../styles/constants";
import { primaryText } from "../../styles/typography";

export const RadioInputRoot = styled.div<{ hasError: boolean }>`
  display: flex;
  height: 2.7rem;
  align-items: center;
  width: 100%;

  & input {
    margin-left: 0;
    margin-right: 1.4rem;
    margin-top: 0;
    width: 1.6rem;
    height: 1.6rem;

    appearance: none;
    position: relative;
    transition: background-color ${TRANSITION};

    &:before {
      content: "";
      display: block;
      position: absolute;
      width: 1.6rem;
      height: 1.6rem;
      border-radius: 50%;
      border: 1px solid ${({ theme }) => theme.colors.green};
    }

    &:checked:before {
      background-color: ${({ theme }) => theme.colors.green};
    }
  }

  & label {
    display: flex;
    ${primaryText};
    text-transform: none;
    flex-grow: 1;
  }
`;
