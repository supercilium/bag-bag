import styled from "styled-components";
import { TRANSITION } from "../../styles/constants";

export const ButtonsBlock = styled.div`
  display: grid;
  grid-gap: 12px;
  grid-template-columns: 1fr 5.4rem;
  width: 100%;

  & > button:first-child {
    flex-grow: 1;
  }

  & svg {
    width: 3.2rem;
    height: 2.8rem;
    fill: ${({ theme }) => theme.colors.black};
    transition: fill ${TRANSITION};
  }
  & button:hover svg {
    fill: transparent;
  }
`;
