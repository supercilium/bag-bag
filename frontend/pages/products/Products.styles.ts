import styled from 'styled-components'
import { device } from '../../styles/constants';
import { Container } from '../../styles/layout'
import { primaryText, subtitle } from '../../styles/typography';

export const ProductsRoot = styled.div`
    ${Container}
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: space-between;
    padding-top: 9rem;
    align-items: flex-start;

    h2 {
      color: ${({ theme }) => theme.colors.green};
      margin-bottom: 2.6rem;
    }
`

export const ItemDescriptionContainer = styled.div`
  background-color: #fff;
  padding: 0 19rem;

  @media ${device.laptop} {
    position: sticky;
    top: 9rem;
  }
`;

export const DescriptionTitle = styled.div`
  ${subtitle};
  margin-bottom: 1.5rem;
`

export const Description = styled.div`
  ${primaryText};
  padding-bottom: 3.6rem;
  margin-bottom: 3.6rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey3};
`

export const PriceRow = styled.div`
  ${subtitle};
  padding-bottom: 3.6rem;
`


export const DescriptionBlock = styled.div`
    margin: 3.6rem 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    `

export const DescriptionRow = styled.div`
    ${primaryText};
    display: flex;
`

export const Attribute = styled.span`
    margin-right: 1.6rem;
    color: ${({ theme }) => theme.colors.grey2};
`
export const AccordionTitle = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.black};

  & > svg {
    margin-right: 1.5rem;
    color: ${({ theme }) => theme.colors.grey2};
  }
`