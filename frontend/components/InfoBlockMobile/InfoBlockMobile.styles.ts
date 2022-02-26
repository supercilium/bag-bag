import styled from "styled-components";
import { primaryText, subtitle } from "../../styles/typography";

export const InfoBlockContainer = styled.div`
  padding: 1.5rem 0;
`;

export const Title = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background: none;
  ${subtitle};
  cursor: pointer;
  padding: 0;
  width: 100%;
  position: relative;
`;

export const Content = styled.div`
  padding-top: 1.5rem;
  ${primaryText};
  color: ${({ theme }) => theme.colors.grey};
`;

export const Border = styled.button`
  height: 22px;
  display: flex;
  align-items: center;
  gap: 17px;
  border: none;
  background: none;
  min-width: 100%;


  & hr {
    flex-grow: 1;
    height: 1px;
  }
`