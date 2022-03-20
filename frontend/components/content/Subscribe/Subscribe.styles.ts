import styled from "styled-components";
import { device } from "../../../styles/constants";
import { Container } from "../../../styles/layout";

export const SubscribeBlock = styled.form`
  ${Container};
  padding: 7.8rem 3.6rem;
  background-color: ${({ theme }) => theme.colors.greenLight};
  position: relative;
  min-height: 435px;
  
  &::before {
    border: 1px solid ${({ theme }) => theme.colors.black};
    content: '';
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border-radius: 60px;
  }
  
  & h2 {
    text-align: center;
    margin-bottom: 50px;
  }
  
  & > div > div:first-child {
    flex-grow: 1;

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

  & > div {
    display: flex;
    flex-direction: column;
    gap: 14px;
    align-items: stretch;
  }

  @media ${device.laptopL} {
    background-color: unset;
    min-height: unset;

    & h2 {
      display: none;
    }

    & > div {
      display: flex;
      align-items: flex-start;
      flex-direction: row;
      gap: 3.6rem;
    }

    &::before {
      display: none;
    }
  }
`;
