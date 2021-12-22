import styled from "styled-components"
import { Button } from "../../Button"

export const CollectionList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: flex-start;
  grid-gap: 3.6rem;
  margin-top: 5rem;
`

export const BigButton = styled(Button)`
  width: 26.6rem;
  height: 26.6rem;
  border-radius: 50%;
  padding-left: 0;
  padding-right: 0;

  & > svg {
    margin-top: 7px;
  }
`

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`
