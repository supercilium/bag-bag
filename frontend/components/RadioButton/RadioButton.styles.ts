import styled from "styled-components";
import { device, TRANSITION } from "../../styles/constants";
import { primaryText } from "../../styles/typography";

export const RadioInputRoot = styled.div<{ hasError: boolean }>`
  display: flex;
  width: 100%;
  margin-bottom: 18px;

  & input {
    margin-left: 0;
    margin-right: 1.4rem;
    margin-top: 0;
    width: 18px;
    height: 18px;

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
    line-height: 18px;
  }

  @media ${device.laptopL} {
    height: 2.7rem;
    align-items: center;
    margin-bottom: 0;

    & input {
      width: 1.6rem;
      height: 1.6rem;
    }

    & label {
      line-height: 150%;
    }
  }
`;
