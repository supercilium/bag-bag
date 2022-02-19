import { primaryText, subtitle } from "../typography";
import styled, { DefaultTheme } from "styled-components";

export const ProfileRoot = styled.div`
  display: grid;
  grid-template-columns: 43.5rem 1fr;
  grid-gap: 3.6rem;
  margin: 8rem 0 20rem;
  padding: 3.6rem;
`;

export const Tabs = styled.div`
  display: grid;
  grid-gap: 3.6rem;
  grid-template-rows: 6rem;
  align-self: flex-start;
`;

export const Tab = styled.button<{ $active: boolean }>`
  border: none;
  background: none;
  border-bottom: 1px solid
    ${({ theme, $active }) =>
    $active ? theme.colors.green : theme.colors.grey3};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.green : theme.colors.black};
  display: flex;
  align-items: center;
  padding: 1.5rem;
  line-height: 2.2rem;
  ${subtitle}

  & > svg {
    margin-right: 1.5rem;
  }
`;

export const InfoTab = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3.6rem;
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
  grid-template-columns: repeat(6, 1fr);
  ${primaryText};
  text-transform: none;
  justify-content: space-between;
  text-align: left;
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
  grid-template-columns: repeat(4, 1fr) 2fr;
  color: ${({ theme }) => theme.colors.grey2};

  & > div:first-child {
    grid-column-start: 3;
  }
`;

export const PreviousPrice = styled.div`
  color: ${({ theme }) => theme.colors.grey2};
  text-decoration: line-through;
`

export const StatusHighlight = styled.div<{ highlight?: keyof DefaultTheme['colors'] }>`
  color: ${({ highlight, theme }) => theme.colors[highlight]}
`