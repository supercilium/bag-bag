import styled from "styled-components";
import { primaryText } from "../../styles/typography";

export const StyledButton = styled.button`
  border: none;
  background: none;
  ${primaryText};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
`;
