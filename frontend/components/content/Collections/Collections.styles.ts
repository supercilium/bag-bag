import styled from "styled-components";
import { device } from "../../../styles/constants";
import { Button } from "../../Button";

export const CollectionList = styled.div`
  margin-top: 5rem;
  
  @media ${device.laptopL} {
    display: grid;
    grid-template-columns: repeat(3, minMax(0, 1fr));
    align-items: flex-start;
    grid-gap: 3.6rem;    
  }
`;

export const BigButton = styled(Button)`
  width: 26.6rem;
  height: 26.6rem;
  border-radius: 50%;
  padding-left: 0;
  padding-right: 0;

  & > svg {
    margin-top: 7px;
  }
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;
