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
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > div:first-child {
    border-radius: 2.4rem;
  }
`;

export const Discount = styled.div`
  position: absolute;
  top: 3rem;
  left: 2.5rem;
  background-color: ${({ theme }) => theme.colors.pink};
  color: ${({ theme }) => theme.colors.green};
  ${subtitle}
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
`;

export const Condition = styled.span`
  color: ${({ theme }) => theme.colors.grey};
  margin-left: auto;
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

  & ${Condition} span {
    text-transform: lowercase;
  }
`;
