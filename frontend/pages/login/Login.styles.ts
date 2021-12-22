import styled from "styled-components"
import { Button } from "../../components/Button"
import { buttonText } from "../../styles/typography"

export const FormBlock = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 3.6rem;
  width: 90.6rem;
  padding: 4rem 6rem;
`

export const LoginRoot = styled.div`
  margin: 9rem 0 22rem;
`

export const Tabs = styled.div`
  margin: 0 0 4.7rem;
  display: flex;
  justify-content: center;
`

export const Tab = styled.button<{ $isActive: boolean }>`
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.green : theme.colors.grey2};
  border: none;
  background: none;
  padding: 1.8rem;
  ${buttonText}
  text-transform: lowercase;
  font-weight: 500;
  cursor: pointer;
`

export const SmallButton = styled(Button)`
  font-size: 3.6rem;
  display: block;
  width: 100%;
  line-height: 4.3rem;
  padding: 4px 0 7px;
  height: auto;
`

export const FormRoot = styled.form`
  display: grid;
  grid-gap: 1.5rem;

  ${SmallButton} {
    margin-top: 6rem;
  }
`
