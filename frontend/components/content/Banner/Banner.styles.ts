import styled from "styled-components";
import { device, TRANSITION } from "../../../styles/constants";
import { Container } from "../../../styles/layout";
import ReactMarkdown from "react-markdown";

export const BannerRoot = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
`;

export const TitleText = styled(ReactMarkdown)`
  text-transform: lowercase;
  margin: 0;

  & p {
    margin: 0;
  }
`

export const BannerContainer = styled.div`
  height: calc(100vh - 53px);
  position: relative;
  /* display: flex; */
  ${Container}

  @media ${device.laptopL} {
    height: calc(100vh - 9rem);
  }
`;

export const BannerImage = styled.div<{ $url: string }>`
  border-radius: 6rem;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)),
    linear-gradient(0deg, rgba(143, 153, 189, 0.31), rgba(143, 153, 189, 0.31)),
    linear-gradient(0deg, rgba(167, 213, 239, 0.17), rgba(167, 213, 239, 0.17)),
    url(${({ $url }) => $url}), #ebebeb;
  background-blend-mode: normal, overlay, multiply, normal, normal;
  background-size: auto, auto, auto, cover, auto;
  background-position-x: center;
  color: ${({ theme }) => theme.colors.white};
  padding: 21px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  height: 100%;
  border: 1.4rem solid ${({ theme }) => theme.colors.white};

  @media ${device.laptopL} {
    padding: 4.4rem 6.6rem;
    align-items: flex-start;

    & > button {
      display: none;
    }
  }
`;

export const BannerActions = styled.div`
  display: none;

  @media ${device.laptopL} {
    display: flex;
    position: absolute;
    bottom: 9rem;
    right: 9rem;

    & button + button {
      margin-left: 3rem;
    }
  }
`;

export const BannerDot = styled.li<{ active: boolean }>`
  transform: rotate(-90deg);
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 1;

  & button {
    border: none;
    padding: 0;
    background-color: unset;
    transition: font ${TRANSITION};
    font-size: ${({ active }) => active ? '1.8rem' : '1.2rem'};
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: ${({ active, theme }) => active ? theme.colors.green : theme.colors.black};
  }
`

export const BrandsBlock = styled.div`
  position: relative;
  height: 66.3rem;
  padding: 19rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
  max-width: 100%;
`;

export const BrandsLine = styled.div`
  text-transform: uppercase;
  white-space: nowrap;

  & span {
    position: relative;
    cursor: pointer;
    transition: color ${TRANSITION};
    letter-spacing: 0.07em;
  }

  & span:hover {
    color: ${({ theme }) => theme.colors.green};
  }

  & span:nth-child(odd) {
    font-style: italic;
    font-family: New York Extra Large, serif;
    font-weight: 400;
  }

  & span:after {
    content: "/";
    font-family: New York Extra Large, serif;
    font-style: italic;
    font-weight: 400;
    font-size: 7.2rem;
    line-height: 140.5%;
  }

  & sup {
    font-style: italic;
    font-size: 1.8rem;
    letter-spacing: 0.03em;
    position: absolute;
    top: 0;
    line-height: 1;
  }
`;

export const BrandItem = styled.span<{ $preview: string }>`
  position: relative;
  
  @media ${device.laptopL} {
    &::before {
      content: '';
      position: absolute;
      display: none;
      background: #fff url(${({ $preview }) => $preview});
      background-size: cover;
      bottom: 100%;
      left: 50%;
      margin-left: -16.5rem;
      width: 33rem;
      height: 33rem;
      outline: 1px solid ${({ theme }) => theme.colors.black};
      border: 15px solid ${({ theme }) => theme.colors.white};
      box-sizing: border-box;
      border-radius: 36px;
      padding: 1.5rem;
    }
  
    &:hover::before {
      display: ${({ $preview }) => $preview ? 'block' : 'none'};
    }
  }
`

export const Root = styled.div`
  overflow: hidden;
`