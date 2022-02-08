import styled from "styled-components";
import { Container } from "../../styles/layout";

export const BannerRoot = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
`;

export const BannerContainer = styled.div`
  height: 89.8rem;
  display: flex;
  ${Container}
`;

export const BannerImageContainer = styled.div`
  padding: 1.4rem;
  border-right: 1px solid ${({ theme }) => theme.colors.black};
  display: flex;
`;

export const BannerImage = styled.div<{ $url: string }>`
  border-radius: 6rem;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)),
    linear-gradient(0deg, rgba(143, 153, 189, 0.31), rgba(143, 153, 189, 0.31)),
    linear-gradient(0deg, rgba(167, 213, 239, 0.17), rgba(167, 213, 239, 0.17)),
    url(${({ $url }) => $url}), #ebebeb;
  background-blend-mode: normal, overlay, multiply, normal, normal;
  background-size: auto, auto, auto, cover, auto;
  color: ${({ theme }) => theme.colors.white};
  padding: 4.4rem 6.6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  & > div {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

export const BannerActions = styled.div`
  display: flex;

  & button + button {
    margin-left: 3rem;
  }
`;

export const BannerAside = styled.div`
  width: 8.8rem;
  flex-shrink: 0;
`;

export const BrandsBlock = styled.div`
  position: relative;
  height: 66.3rem;
  padding: 19rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
`;

export const BrandsLine = styled.div`
  text-transform: uppercase;
  white-space: nowrap;

  & span:nth-child(odd) {
    font-style: italic;
    font-family: New York Extra Large, serif;
  }

  & span:after {
    content: "/";
    font-family: New York Extra Large, serif;
    font-style: italic;
    font-weight: 400;
    font-size: 7.2rem;
    line-height: 140.5%;
  }
`;

export const FloatingImage = styled.div`
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
`;
