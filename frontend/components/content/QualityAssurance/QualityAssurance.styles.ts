import styled from "styled-components";

export const TitleBlock = styled.div`
  padding: 9.5rem 3.6rem 11.8rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.green};

  & > div {
    display: flex;
    align-items: center;
  }
`;
export const QualityAssuranceTitleImage = styled.div`
  flex-shrink: 0;
  margin: 0 11.5rem;
`;

export const ContentBlock = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};

  & > div {
    height: 72rem;
    display: flex;
  }
`;
export const QualityAssuranceBannerContainer = styled.div`
  border-right: 1px solid ${({ theme }) => theme.colors.black};
  padding: 1.5rem;
  flex-basis: 127.4rem;
  min-width: 127.4rem;
`;

export const QualityAssuranceContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 7.5rem;
`;

export const QualityAssuranceBanner = styled.div<{ $url: string }>`
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)),
    linear-gradient(0deg, rgba(143, 153, 189, 0.44), rgba(143, 153, 189, 0.44)),
    linear-gradient(0deg, rgba(167, 213, 239, 0.24), rgba(167, 213, 239, 0.24)),
    url(${({ $url }) => $url}), #ebebeb;
  background-blend-mode: normal, overlay, multiply, normal, normal;
  background-size: auto, auto, auto, cover, auto;
  border-radius: 6rem;
  height: 100%;
`;
