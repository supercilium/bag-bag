import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { device } from "../constants";
import { Container } from "../layout";
import { PreviousPrice, primaryText, subtitle } from "../typography";

export const ProductsRoot = styled.div`
  ${Container}
  padding: 0 3.6rem 0;

  h2 {
    color: ${({ theme }) => theme.colors.green};
    margin: 2.6rem 0;
  }

  @media ${device.laptopL} {
    padding: 9rem 3.6rem 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: space-between;
    align-items: flex-start;
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 462px;
  position: relative;
  margin-bottom: 27px;

  & img {
    border-radius: 3.6rem;
  }

  @media ${device.laptopL} {
    height: auto;
    display: grid;
    grid-gap: 3.6rem;
    margin-bottom: 0;
  }
`;

export const ItemDescriptionContainer = styled.div`
  background-color: #fff;
  
  @media ${device.laptopL} {
    padding: 0 19rem;
    position: sticky;
    top: 9rem;
  }
`;

export const DescriptionTitle = styled.div`
  ${subtitle};
  margin-bottom: 1.5rem;
`;

export const Description = styled(ReactMarkdown)`
  ${primaryText};
  color: ${({ theme }) => theme.colors.grey};

  & > p {
    margin-bottom: 0;
  }
  
  @media ${device.laptopL} {
    padding-bottom: 3.6rem;
    margin-bottom: 3.6rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey3};
  }
`;

export const PriceRow = styled.div`
  ${subtitle};
  font-size: 2.4rem;
  padding-bottom: 3.6rem;

  & ${PreviousPrice} {
    font-size: 1.8rem;
    margin-left: 2.4rem;
  }
`;

export const DescriptionBlock = styled.div`
  margin: 3.6rem 0;
`;

export const DescriptionRow = styled.div`
  ${primaryText};
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 9px;
  
  @media ${device.laptopL} {
    display: flex;
  }
`;

export const Attribute = styled.span`
  margin-right: 1.6rem;
  color: ${({ theme }) => theme.colors.grey2};
`;
export const AccordionTitle = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.black};

  & > svg {
    margin-right: 1.5rem;
    color: ${({ theme }) => theme.colors.grey2};
  }
`;

export const CarouselContainer = styled.div`
  @media ${device.laptopL} {
    margin: 0 -1.8rem;
  }
`

export const ItemButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  right: 0;
  left: 0;
  bottom: 42px;
  position: absolute;
`;

export const ItemCount = styled.div`
  font-family: New York Extra Large;
  font-style: italic;
  font-weight: 500;
  font-size: 18px;
  line-height: 140.5%;
`;