import styled from "styled-components";
import ReactMarkdown from "react-markdown";

import {
  buttonText,
  PreviousPrice,
  primaryText,
} from "../typography";

export const MainContent = styled.main`
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 3.6rem;
  padding: 0 1.5rem;
  margin-bottom: 7rem;
`;

export const CartItem = styled.div`
  display: grid;
  grid-template-columns: 34.5rem 1fr;
  padding: 1.5rem 0;

  & > div:first-child {
    flex-shrink: 0;
  }

  & + & {
    border-top: 1px solid ${({ theme }) => theme.colors.black};
  }
`;

export const CartHeader = styled.h4`
  ${buttonText};
  margin: 0 0 3.8rem;
  line-height: 110%;
  text-transform: capitalize;
  color: ${({ theme }) => theme.colors.green};
`;

export const Left = styled.div`
  margin: 4.5rem 6rem;
`;

export const TopBlock = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey3};
  padding-bottom: 3.6rem;

  & > div {
    flex-basis: 50%;
  }
`;

export const BottomBlock = styled.div`
  display: flex;
  padding-top: 3.6rem;

  ${PreviousPrice} {
    ${primaryText};
    margin-right: 3.6rem;
  }

  & > button {
    margin-left: auto;
  }
`;

export const Description = styled.div`
  display: grid;
`;

export const DescriptionRow = styled.div`
  ${primaryText};
  display: flex;
`;

export const Attribute = styled.span`
  flex-basis: 10rem;
  color: ${({ theme }) => theme.colors.grey2};
`;

export const Summary = styled.div`
  width: 90rem;
  margin-left: auto;
  margin-bottom: 22.5rem;

  & > button {
    width: 100%;
  }
`;

export const SummaryTop = styled.div`
  display: flex;
  padding-bottom: 6rem;
  margin-bottom: 6rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey3};

  & > * {
    margin-top: 0;
    flex-basis: 50%;
  }
`;

export const PriceSummary = styled.div`
  ${primaryText};
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-between;
  text-transform: uppercase;
  font-weight: 500;

  & > span:nth-child(even) {
    text-align: right;
  }
`;

export const DescriptionText = styled(ReactMarkdown)`
  ${primaryText};
`