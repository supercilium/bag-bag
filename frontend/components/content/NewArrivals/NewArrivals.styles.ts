import styled from "styled-components";
import { device } from "../../../styles/constants";

export const Carousel = styled.div`
  padding-bottom: 24px;
  justify-items: space-between;
  margin: 5rem 18px 10px;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  width: 100%;
  scroll-snap-type: x mandatory;
  list-style-type: none;
  display: flex;
  gap: 16px;

  & > a {
    scroll-snap-align: start;
  }

  @media ${device.laptopL} {
    margin: 5rem 18px 6rem;
    padding: 0;
    overflow: auto;
    grid-template-columns: repeat(4, 1fr);
    display: grid;
    grid-gap: 3.6rem;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  
  & > div:first-child {
    display: none;
  }
  
  @media ${device.laptopL} {
    justify-content: space-between;
    
    & > div:first-child {
      display: flex;
    }

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
