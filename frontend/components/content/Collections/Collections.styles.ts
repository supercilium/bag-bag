import styled from "styled-components";
import { device } from "../../../styles/constants";
import { Button } from "../../Button";

export const CollectionList = styled.div`
  margin: 5rem 0 11rem;
  width: 100%;
  
  @media ${device.laptopL} {
    grid-gap: 3.6rem;
    display: grid;
    grid-template-columns: repeat(3, minMax(0, 1fr));
    align-items: flex-start;
  }
`;

export const BigButton = styled(Button)`
  width: 26.6rem;
  height: 26.6rem;
  border-radius: 50%;
  padding-left: 0;
  padding-right: 0;
  margin-top: 80px;

  & > svg {
    margin-top: 14px;
  }

  @media ${device.laptopL} {
    margin-top: 0
  }
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;
