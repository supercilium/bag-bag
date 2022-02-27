import {
  ContentBlock,
  QualityAssuranceBanner,
  QualityAssuranceBannerContainer,
  QualityAssuranceContent,
  QualityAssuranceTitleImage,
  TitleBlock,
} from "./QualityAssurance.styles";
import NextImage from "../../Image";
import React from "react";
import Link from "next/link";
import { Button } from "../../Button";

// export interface QualityAssuranceProps {};

export const QualityAssurance: React.FC = (props) => {
  return (
    <>
      <TitleBlock>
        <div className="container">
          <QualityAssuranceTitleImage>
            <NextImage
              src="/quality_assurance.png"
              alt="Гарантия качества"
              height="278"
              width="277"
            />
          </QualityAssuranceTitleImage>
          <h2 className="h1">
            внимательно проверяем каждую <br />
            <i>сумку перед отправкой</i>
          </h2>
        </div>
      </TitleBlock>
      <ContentBlock>
        <div className="container">
          <QualityAssuranceBannerContainer>
            <QualityAssuranceBanner $url="/banner.jpg" />
          </QualityAssuranceBannerContainer>
          <QualityAssuranceContent>
            <p className="primary-text">
              Мы внимательно проверяем каждую сумку перед отправкой, ведь нам
              важно дарить вам только положительные эмоции от покупки. Благодаря
              выстроенной системе контроля качества и широким компетенциям наших
              специалистов мы гарантируем качество вещей и их подлинность.
            </p>
          </QualityAssuranceContent>
        </div>
        <Link href="/offer">
          <Button>подробнее</Button>
        </Link>
      </ContentBlock>
    </>
  );
};
