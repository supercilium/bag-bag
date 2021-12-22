import { subtitle } from "../../styles/typography"
import styled from "styled-components"

export const ProfileRoot = styled.div`
  display: grid;
  grid-template-columns: 43.5rem 1fr;
  grid-gap: 3.6rem;
  margin: 8rem 0 20rem;
  padding: 3.6rem;
`

export const Tabs = styled.div`
  display: grid;
  grid-gap: 3.6rem;
  grid-template-rows: 6rem;
  align-self: flex-start;
`

export const Tab = styled.button<{ $active: boolean }>`
  border: none;
  background: none;
  border-bottom: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.green : theme.colors.grey3};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.green : theme.colors.black};
  display: flex;
  align-items: center;
  padding: 1.5rem;
  line-height: 2.2rem;
  ${subtitle}

  & > svg {
    margin-right: 1.5rem;
  }
`

export const Box = styled.div`
  padding: 6rem;
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 3.6rem;
  display: grid;
  grid-gap: 1.5rem;
`

export const InfoTab = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3.6rem;
`
