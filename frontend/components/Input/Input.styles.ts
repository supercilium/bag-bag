import styled from "styled-components"
import { subtitle } from "../../styles/typography"

export const InputBlock = styled.div`
  position: relative;
  height: 9rem;

  & > label {
    ${subtitle}
  }
`

export const InputRoot = styled.input`
  display: block;
  width: 100%;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
  height: 6.3rem;
`
