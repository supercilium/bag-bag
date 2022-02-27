import styled from "styled-components";
import { device } from "../../styles/constants";
import { primaryText } from "../../styles/typography";

export const CollectionItemRoot = styled.a<{ $halfHeight?: boolean }>`
  display: flex;
  flex-direction: column;
  height: 88.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
  width: 100%;

  h4 {
    margin: 3.6rem 0 1.5rem;
    line-height: 130%;
  }

  @media ${device.laptopL} {
    height: ${({ $halfHeight }) => ($halfHeight ? "48rem" : "88.5rem")};
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 72rem;
  position: relative;

  & img {
    border-radius: 3.6rem;
  }
`

export const Tag = styled.span`
  ${primaryText}
  line-height: 110%;
  color: ${({ theme }) => theme.colors.grey};
`;
