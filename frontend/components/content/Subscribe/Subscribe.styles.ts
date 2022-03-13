import styled from "styled-components";
import { device } from "../../../styles/constants";
import { Container } from "../../../styles/layout";

export const SubscribeBlock = styled.form`
  ${Container};
  padding: 7.8rem 3.6rem;

  
  & > div > div:first-child {
    flex-grow: 1;
    margin-right: 3.6rem;

    & input {
      height: 8.6rem;
    }

    & input::placeholder {
      color: ${({ theme }) => theme.colors.grey2};
      font-size: 4rem;
      text-transform: uppercase;
      line-height: 100%;
    }

  }

  @media ${device.laptopL} {
    & h2 {
      display: none;
    }
    & > div {
      display: flex;
      align-items: flex-start;
    }
  }
`;
