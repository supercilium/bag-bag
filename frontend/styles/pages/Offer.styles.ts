import styled from "styled-components";
import { device } from "../constants";
import { Box, Container } from "../layout";

export const OrderContainer = styled.form`
  ${Container};
  display: grid;
  grid-gap: 3.6rem;
  margin: 0 3.6rem 25rem;
  width: auto;

  & ${Box} {
    padding: 3rem;
  }

  @media ${device.hd} {
    & ${Box} {
      padding: 6rem;
    }
  }
`;

export const ImageInputsRow = styled.div`
  grid-gap: 1.5rem;
  grid-template-columns: repeat(6, auto);
  justify-content: flex-start;
  display: grid;
  flex-wrap: wrap;
`;
