import styled from "styled-components";
import { PreviousPrice, subtitle } from "../../styles/typography";

export const ItemRoot = styled.div`
  width: 100%;
  height: 63rem;
  border: 1px solid #1d1d1b;
  box-sizing: border-box;
  border-radius: 3.6rem;
  padding: 1.5rem 1.5rem 4.2rem;
  position: relative;
`;

export const Discount = styled.div`
  position: absolute;
  top: 3rem;
  left: 2.5rem;
  background-color: ${({ theme }) => theme.colors.pink};
  color: ${({ theme }) => theme.colors.green};
  font-style: italic;
  ${subtitle}
  font-family: New York Extra Large, serif;
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
`;

export const NameBlock = styled.div`
  margin: 3.6rem 1.1rem 0;

  & > div {
    display: flex;
  }

  & h4 {
    margin-bottom: 1.3rem;
  }

  & span {
    ${subtitle}
  }

  & ${PreviousPrice} {
    margin-left: 1.5rem;
    flex-grow: 1;
  }
`;


export const Ex = styled.span`
  justify-self: flex-end;
  color: ${({ theme }) => theme.colors.grey};
`;
