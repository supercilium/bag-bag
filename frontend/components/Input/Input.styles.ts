import styled from "styled-components";
import { device } from "../../styles/constants";
import { subtitle } from "../../styles/typography";


export const InputRoot = styled.input`
  display: block;
  width: 100%;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 0;
  height: 6.3rem;
  font-size: 18px;
  padding-left: 0;
  padding-right: 0;

  &[type="date" i], &[type="time" i] {
    font-size: 18px;
    font-family: Graphik LC, sans-serif;
    color: ${({ theme }) => theme.colors.grey2};
  }

  &:focus-visible {
    outline: none;
  }

  &:focus {
    border-bottom: 1px solid ${({ theme }) => theme.colors.green};
  }
`;

export const InputBlock = styled.div<{ $hasError: boolean }>`
  position: relative;

  & > label {
    ${subtitle}
  }

  & ${InputRoot} {
    border-bottom-color: ${({ theme, $hasError }) => $hasError ? theme.colors.red : theme.colors.black};
  }

  @media ${device.laptopL} {
    height: 9rem;
  }
`;

export const IconContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 6.3rem;
  display: flex;
  align-items: center;
`

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.red};
  font-size: 12px;
  margin-top: 6px;

  @media ${device.laptopL} {
    font-size: 1.2rem;
  }
`