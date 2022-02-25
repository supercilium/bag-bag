import styled from "styled-components";
import { device } from "../../styles/constants";
import { buttonText } from "../../styles/typography";

export const ContentBlock = styled.div`
  padding: 11.3rem 3.6rem 13.9rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};

  h2 {
    color: ${({ theme }) => theme.colors.green};
    text-transform: lowercase;

    & span {
      display: none;
    }
  }

  @media ${device.laptopL} {
    h2 {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      
      & span {
        display: block;
        color: ${({ theme }) => theme.colors.black};
        text-transform: lowercase;
        ${buttonText}
      }
    }
  }
`;
