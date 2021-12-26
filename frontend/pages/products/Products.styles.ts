import styled from 'styled-components'
import { device } from '../../styles/constants';
import { Container } from '../../styles/layout'

export const ProductsRoot = styled.div`
    ${Container}
    display: grid;
    grid-template-columns: 90rem 59rem;
    justify-content: space-between;
    padding-top: 9rem;
    align-items: flex-start;
`

export const ItemDescriptionContainer = styled.div`
  background-color: #fff;
  padding: 0 20px;

  @media ${device.laptop} {
    position: sticky;
    top: 9rem;
  }
`;

