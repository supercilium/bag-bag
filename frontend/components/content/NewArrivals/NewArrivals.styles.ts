import styled from "styled-components"

export const Carousel = styled.div`
  display: grid;
  grid-gap: 3.6rem;
  grid-template-columns: repeat(4, 1fr);
  justify-items: space-between;
  margin: 5rem 0 6rem;
`
export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;

  & > div {
    display: flex;
    align-items: center;
  }
`

export const Count = styled.div`
  font-family: New York Extra Large;
  font-style: italic;
  font-weight: 500;
  font-size: 3.6rem;
  line-height: 140.5%;
  margin: 0 3rem;
`
