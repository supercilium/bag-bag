import styled from "styled-components";
import { device } from "../constants";


export const CatalogueGrid = styled.div`

  @media ${device.laptopL} {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    /* grid-template-rows: repeat(5, 1fr); */
    grid-gap: 3.6rem;
    margin: 6rem 0;
  }
`;

export const CatalogueItem = styled.div<{ $gridArea: string }>`
  margin-bottom: 24px;

  @media ${device.laptopL} {
    margin-bottom: unset;
    grid-area: ${({ $gridArea }) => $gridArea};
  }
`;
