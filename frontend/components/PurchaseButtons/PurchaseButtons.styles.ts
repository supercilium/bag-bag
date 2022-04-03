import styled from "styled-components";
import { TRANSITION } from "../../styles/constants";

export const ButtonsBlock = styled.div`
  display: flex;
  gap: 12px;

  & > button:first-child {
    flex-grow: 1;
    padding-left: 0;
    padding-right: 0;
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

export const LikeButton = styled.span<{ $isInFavorite: boolean }>`
  & svg {
    fill: ${({ theme, $isInFavorite }) => $isInFavorite ? theme.colors.green : 'none'};
  }
`