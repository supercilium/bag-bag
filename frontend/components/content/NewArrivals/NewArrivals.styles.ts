import styled from "styled-components";
import { device } from "../../../styles/constants";

export const Carousel = styled.div`
  justify-items: space-between;
  margin: 5rem 0 6rem;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  width: 100%;
  scroll-snap-type: x mandatory;
  padding-left: 0;
  list-style-type: none;
  display: flex;

  & > a {
    scroll-snap-align: start;
  }

  @media ${device.laptopL} {
    overflow: auto;
    grid-template-columns: repeat(4, 1fr);
    display: grid;
    grid-gap: 3.6rem;
  }
`;

export const ButtonsContainer = styled.div`
display: none;

@media ${device.laptopL} {
    display: flex;
    justify-content: space-between;
    
    & > div {
      display: flex;
      align-items: center;
    }

  }
`;

export const Count = styled.div`
  font-family: New York Extra Large;
  font-style: italic;
  font-weight: 500;
  font-size: 3.6rem;
  line-height: 140.5%;
  margin: 0 3rem;
`;
