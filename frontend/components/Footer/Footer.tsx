import {
  FooterRoot,
  FooterBottom,
  FooterLink,
  Copyright,
  FooterTop,
  SocialLink,
  InfoBlock,
  SocialContainer,
} from "./Footer.style";
import Link from "next/link";
import Instagram from "../icons/insta.svg";
import Facebook from "../icons/fb.svg";
import { useTranslation } from "next-i18next";
import { MobileVisible } from "../../styles/layout";
import NextImage from "../Image";

export const Footer = () => {
  const { t } = useTranslation("footer");

  return (
    <FooterRoot>
      <FooterTop>
        <InfoBlock>
          <a href="tel:+79993553535">+7 999 355-35-35</a>
          <a href="mailto:hello@exbags.ru">
            <i>hello@exbags.ru</i>
          </a>
        </InfoBlock>
        <address className="h4">{t("address")}</address>
        <SocialContainer>
          <Link passHref href="/">
            <SocialLink>
              <Instagram />
            </SocialLink>
          </Link>
          <Link passHref href="/">
            <SocialLink style={{ marginLeft: "3.6rem" }}>
              <Facebook />
            </SocialLink>
          </Link>
        </SocialContainer>
        <MobileVisible>
          <Copyright>© (ex)bags 2021</Copyright>
        </MobileVisible>
      </FooterTop>
      <FooterBottom>
        <Link passHref href="/">
          <FooterLink>{t("catalogue")}</FooterLink>
        </Link>
        <Link passHref href="/">
          <FooterLink>{t("sell")}</FooterLink>
        </Link>
        <Link passHref href="/">
          <FooterLink>{t("payment")}</FooterLink>
        </Link>
        <Link passHref href="/">
          <FooterLink>{t("shipping")}</FooterLink>
        </Link>
        <Link passHref href="/">
          <FooterLink>{t("support")}</FooterLink>
        </Link>
        <NextImage src="/visa-footer.png" alt="visa" height="20" width="62" />
        <NextImage
          src="/mastercard-footer.png"
          alt="mastercard"
          height="30"
          width="158"
        />
        <Copyright>© (ex)bags 2021</Copyright>
      </FooterBottom>
    </FooterRoot>
  );
};
