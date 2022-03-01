import styled from "styled-components";
import { device } from "../../styles/constants";
import { primaryText } from "../../styles/typography";

export const CollectionItemRoot = styled.a<{ $halfHeight?: boolean }>`
  display: flex;
  flex-direction: column;
  height: 88.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
  width: 100%;
  margin-bottom: 40px;

  h4 {
    margin: 3.6rem 0 1.5rem;
    line-height: 130%;
  }

  @media ${device.laptopL} {
    margin-bottom: 0;
    height: ${({ $halfHeight }) => ($halfHeight ? "48rem" : "88.5rem")};
  }
`;

export const Description = styled.span`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: block;
`

export const ImageContainer = styled.div`
  width: 100%;
  height: 72rem;
  position: relative;

  & img {
    border-radius: 3.6rem;
  }
`

export const Tag = styled.span`
  ${primaryText};
  text-transform: uppercase;
  line-height: 110%;
  color: ${({ theme }) => theme.colors.grey};
  margin-bottom: 1.6rem;
`;
