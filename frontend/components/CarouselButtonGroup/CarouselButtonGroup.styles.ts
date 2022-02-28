import styled from "styled-components"
import { device } from "../../styles/constants";


export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 18px;
  right: 0;
  left: 0;
  
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