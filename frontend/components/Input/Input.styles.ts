import styled from "styled-components";
import { device } from "../../styles/constants";
import { subtitle } from "../../styles/typography";


export const InputRoot = styled.input`
  display: block;
  width: 100%;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
  height: 6.3rem;
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

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.red};
  font-size: 12px;
  margin-top: 6px;

  @media ${device.laptopL} {
    font-size: 1.2rem;
  }
`