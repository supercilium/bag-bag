import styled from "styled-components";
import { device } from "../../../styles/constants";
import { buttonText } from "../../../styles/typography";

export const Root = styled.div`
  padding: 80px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};

  & h2 {
    padding: 0 18px;
    margin: 0;
    color: ${({ theme }) => theme.colors.green};
    text-transform: lowercase;

    & span {
      display: none;
    }
  }

  @media ${device.laptopL} {
    padding: 11.3rem 0 13.9rem;

    & h2 {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      
      & span {
        display: block;
        color: ${({ theme }) => theme.colors.black};
        text-transform: lowercase;
        ${buttonText};
      }
    }
  }
`

export const Carousel = styled.div`
  justify-items: space-between;
  margin: 5rem 0 10px;
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
  padding: 0 18px 24px;

  & > a {
    scroll-snap-align: start;
  }

  @media ${device.laptopL} {
    margin: 5rem 0 6rem;
    padding: 0 18px;
    overflow: auto;
    grid-template-columns: repeat(4, 1fr);
    display: grid;
    grid-gap: 3.6rem;
  }
`;
