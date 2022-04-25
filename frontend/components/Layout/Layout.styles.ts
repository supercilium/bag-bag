import styled from "styled-components";
import { device } from "../../styles/constants";

export const LayoutRoot = styled.div`
  position: relative;
  min-height: calc(100vh + 450px);
  display: flex;
  padding-top: 53px;
  flex-direction: column;
  
  @media ${device.laptopL} {
    padding-top: 9rem;
  }
`;
