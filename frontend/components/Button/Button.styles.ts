import styled from "styled-components"
import { TRANSITION } from "../../styles/constants"

export const StyledButton = styled.button<{ $round?: boolean }>`
  padding: ${({ $round }) => ($round ? 0 : ".7rem 6.9rem 1.1rem")};
  min-width: 8.6rem;
  height: 8.6rem;
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 9.4rem;
  font-weight: 500;
  font-size: 5.7rem;
  line-height: 6.8rem;
  color: ${({ theme }) => theme.colors.black};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color ${TRANSITION}, color ${TRANSITION},
    border-color ${TRANSITION};

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
`
