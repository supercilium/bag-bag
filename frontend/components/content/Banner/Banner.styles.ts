import styled from "styled-components";
import { device, TRANSITION } from "../../../styles/constants";
import { Container } from "../../../styles/layout";

export const BannerRoot = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
`;

export const BannerContainer = styled.div`
  height: 89.8rem;
  position: relative;
  /* display: flex; */
  ${Container}
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

  & > div {
    display: none;
  }

  & > h2 {
    margin: 0;
  }

  @media ${device.laptopL} {
    padding: 4.4rem 6.6rem;
    align-items: flex-start;

    & > button {
      display: none;
    }

    & > div {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: flex-end;
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
  overflow: hidden;
  max-width: 100%;
`;

export const BrandsLine = styled.div`
  text-transform: uppercase;
  white-space: nowrap;

  & span {
    position: relative;
    cursor: pointer;
    transition: color ${TRANSITION};
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

export const FloatingImage = styled.div`
  display: none;

  @media ${device.laptopL} {
    position: absolute;
    top: -4.4rem;
    left: 50%;
    margin-left: -16.5rem;
    width: 33rem;
    height: 33rem;
    border: 1px solid ${({ theme }) => theme.colors.black};
    background: ${({ theme }) => theme.colors.white};
    box-sizing: border-box;
    border-radius: 36px;
    padding: 1.5rem;
    z-index: 1;
    display: block;
  }
`;
