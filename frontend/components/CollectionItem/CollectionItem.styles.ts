import styled from "styled-components";
import { device, size } from "../../styles/constants";
import { primaryText } from "../../styles/typography";

export const Tag = styled.span`
  ${primaryText};
  text-transform: uppercase;
  line-height: 110%;
  color: ${({ theme }) => theme.colors.grey};
  margin-bottom: 1.6rem;

  @media (max-width: ${size.laptopL}px) {
    display: none;
  }
`;

export const CollectionItemRoot = styled.a<{ $halfHeight?: boolean }>`
  display: flex;
  flex-direction: column;
  height: 88.5rem;
  width: 100%;
  margin-bottom: 40px;

  h4 {
    margin: 30px 18px 0;
    padding-bottom: 35px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey3};
  }

  @media ${device.laptopL} {
    margin-bottom: 0;
    height: ${({ $halfHeight }) => ($halfHeight ? "48rem" : "88.5rem")};
    border-bottom: 1px solid ${({ theme }) => theme.colors.black};

    h4 {
      margin: 3.6rem 0 1.5rem;
      line-height: 130%;
      padding-bottom: 0;
      border-bottom: none;
    }

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
  border-right: 1px solid ${({ theme }) => theme.colors.black};

  & img {
    border-radius: 3.6rem;
  }

  @media ${device.laptopL} {
    border-right: none;
    height: 100%;
  }
`


export const CollectionBanner = styled.div`
  display: grid;
  grid-template-columns: auto 49px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
  border-top: 1px solid ${({ theme }) => theme.colors.black};
  height: 72rem;

  @media ${device.laptopL} {
    display: block;
    border: none;
    height: 100%;
  }
`

export const TagColumn = styled.div`
  letter-spacing: 0.02em;
  font-size: 18px;
  line-height: 130%;
  display: flex;
  flex-direction: column;
  font-weight: 500;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  gap: 20px;
  overflow: hidden;

  & > span {
    transform: rotate(-90deg);
  }

  & > svg {
    color: ${({ theme }) => theme.colors.pink}
  }

  @media ${device.laptopL} {
    display: none;
  }
`