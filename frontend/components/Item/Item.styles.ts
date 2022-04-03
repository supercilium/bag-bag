import styled from "styled-components";
import { device } from "../../styles/constants";
import { PreviousPrice, subtitle } from "../../styles/typography";

export const ItemRoot = styled.div`
  min-width: 339px;
  height: 63rem;
  border: 1px solid #1d1d1b;
  box-sizing: border-box;
  border-radius: 3.6rem;
  padding: 1.5rem 1.5rem 4.2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

  @media ${device.laptopL} {
    width: 100%;
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
  color: ${({ theme }) => theme.colors.black};
  margin-left: auto;

  & i {
    color: ${({ theme }) => theme.colors.green};
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 47.6rem;
  position: relative;

  & img {
    border-radius: 2.4rem;
  }
`

export const NameBlock = styled.div`
  margin: 3.6rem 1.1rem 0;

  & > div {
    display: flex;
  }

  & h4 {
    margin-top: 0;
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
