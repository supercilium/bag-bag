import styled from "styled-components";
import { Container } from "../layout";

export const OrderContainer = styled.form`
  ${Container};
  display: grid;
  grid-gap: 3.6rem;
  padding: 0 3.6rem;
  margin-bottom: 25rem;
`;

export const ImageInputsRow = styled.div`
  grid-gap: 1.5rem;
  grid-template-columns: repeat(6, 25.2rem);
  justify-content: flex-start;
  display: grid;
  flex-wrap: wrap;
`;
