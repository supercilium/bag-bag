import { primaryText, subtitle } from "../typography";
import styled, { DefaultTheme } from "styled-components";
import { device } from "../constants";
import { Icon } from "../../components/InfoBlock/InfoBlock.styles";

export const ProfileRoot = styled.form`
  margin-bottom: 12rem;
  
  @media ${device.laptopL} {
    display: grid;
    grid-template-columns: 43.5rem 1fr;
    grid-gap: 3.6rem;
  }
`;

export const InfoTab = styled.div`
  padding: 1.8rem;
  display: grid;
  grid-gap: 20px;

  @media ${device.laptopL} {
    grid-template-columns: 1fr 1fr;
    grid-gap: 3.6rem;
    padding: 0;
    border: none;
  }
`;

export const Tabs = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 3.6rem;
  padding-bottom: 1.8rem;

  & > hr {
      margin: 0 1.8rem;
  }

  @media ${device.laptopL} {
    display: grid;
    grid-gap: 3.6rem;
    grid-auto-rows: 6rem;
    align-self: flex-start;
    border: none;
    border-radius: 0;

    & ${InfoTab} {
      display: none;
    }

    & > hr {
      display: none;
      color: ${({ theme }) => theme.colors.grey3};
    }
  }
`;

export const Tab = styled.button<{ $active: boolean, $order?: number }>`
  border: none;
  background: none;
  position: relative;
  display: flex;
  align-items: center;
  line-height: 2.2rem;
  padding: 0 1.8rem;
  min-width: 100%;
  order: ${({ $order }) => $order};
  ${subtitle};

  & > svg {
    display: none;
  }

  & ${Icon} {
    padding: 3rem 1.8rem;
  }

  @media ${device.laptopL} {
    min-width: auto;
    border-bottom: 1px solid ${({ theme, $active }) => $active ? theme.colors.green : theme.colors.grey3};
    color: ${({ theme, $active }) => $active ? theme.colors.green : theme.colors.black};
    padding: 0;

    & > svg {
      margin-right: 1.5rem;
      display: block;
    }

    & ${Icon} {
      display: none;
    }
  }
`;

export const TitleRow = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
  height: 3.6rem;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  justify-content: space-between;
  align-items: center;
  ${primaryText};
  color: ${({ theme }) => theme.colors.grey2};
  padding-bottom: 0.9rem;
`;

export const OrderRow = styled.div`
  width: 100%;
  height: 3.6rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  text-align: left;
  
  @media ${device.laptopL} {
    grid-template-columns: repeat(6, 1fr);
    ${primaryText};
    text-transform: none;
    justify-content: space-between;
    text-align: left;
  }
`;

export const DetailsButton = styled.div`
  text-align: right;
  padding-right: 3.2rem;
  text-transform: none;
  color: ${({ theme }) => theme.colors.black};
`;

export const OrderDetails = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  color: ${({ theme }) => theme.colors.grey2};
  margin-bottom: 15px;
  
  @media ${device.laptopL} {
    grid-template-columns: repeat(4, 1fr) 2fr;
    margin-bottom: 0;

    & > div:first-child {
      grid-column-start: 3;
    }
  }
`;

export const CommentaryRow = styled.div`
  grid-column-end: 3;
  grid-column-start: 1;
  margin-top: 15px;
`

export const PreviousPrice = styled.div`
  color: ${({ theme }) => theme.colors.grey2};
  text-decoration: line-through;
`

export const StatusHighlight = styled.div<{ highlight?: keyof DefaultTheme['colors'] }>`
  color: ${({ highlight, theme }) => theme.colors[highlight]};
`

export const NoOrders = styled.p`
  ${primaryText};
  text-align: center;
  color: ${({ theme }) => theme.colors.grey2};
`