import styled from "styled-components";
import { device } from "../../styles/constants";
import { PreviousPrice, subtitle } from "../../styles/typography";
import { PurchaseButtons } from "../PurchaseButtons/";

export const HidingPurchaseButtons = styled(PurchaseButtons)`
  display: none;
`;

export const FavoriteRoot = styled.div`
  height: 63rem;
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 3.6rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-items: space-between;

  & ${HidingPurchaseButtons} {
      display: flex;
  }


  @media ${device.laptopL} {
    /* width: 67rem; */
    height: 67rem;

    & ${HidingPurchaseButtons} {
        display: none;
    }

    &:hover {
      border-color: ${({ theme }) => theme.colors.black};
  
      ${HidingPurchaseButtons} {
        display: flex;
      }
    }
  }

`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 37rem;
  position: relative;
  
  & img {
    border-radius: 3.6rem;
  }
  
  @media ${device.laptopL} {
    height: 72rem;
  }
`

export const NameBlock = styled.div`
  margin: 3.6rem 1.1rem 2rem;

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
