import styled from "styled-components"
import { primaryText, subtitle } from "../../styles/typography"

export const InfoBlockContainer = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey3};
  padding: 1.5rem 0;
`

export const Title = styled.button`
    display: flex;
    align-items: center;
    border: none;
    background: none;
    ${subtitle};
    cursor: pointer;
    padding: 0;
    width: 100%;
`

export const Icon = styled.span<{ $isOpen: boolean }>`
    width: 2.2rem;
    height: 2.2rem;
    transform: ${({ $isOpen }) => $isOpen ? 'rotate(-90deg)' : 'rotate(90deg)'};
    margin-left: auto;
    ${({ theme }) => theme.colors.black};
`

export const Content = styled.div`
    padding-top: 1.5rem;
    ${primaryText};
    color: ${({ theme }) => theme.colors.grey};
`