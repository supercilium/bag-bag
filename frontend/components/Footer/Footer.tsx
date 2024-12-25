import {
  FooterRoot,
  FooterBottom,
  FooterLink,
  Copyright,
  FooterTop,
  SocialLink,
  InfoBlock,
  SocialContainer,
  TelegramIcon,
} from "./Footer.style";
import Link from "next/link";
import Instagram from "../icons/insta.svg";
import Facebook from "../icons/fb.svg";
import { useTranslation } from "next-i18next";
import { MobileVisible } from "../../styles/layout";
import NextImage from "../Image";

export const Footer = () => {
  const { t, ready } = useTranslation("footer");
  const year = new Date().getFullYear();

  return (
    <FooterRoot>
      <FooterTop>
        <InfoBlock>
          <a href="tel:+999999999999">+99 999 999-99-99</a>
          <a href="mailto:hello@bagbag.ru">
            <i>hello@bagbag.ru</i>
          </a>
        </InfoBlock>
        <address className="h4">{ready ? t("address") : ""}</address>
        <SocialContainer>
          <Link passHref href="/">
            <SocialLink>
              <TelegramIcon />
            </SocialLink>
          </Link>
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
          <Copyright>© BagBag {year}</Copyright>
        </MobileVisible>
      </FooterTop>
      <FooterBottom>
        <Link passHref href="/">
          <FooterLink>{ready ? t("catalogue") : ""}</FooterLink>
        </Link>
        <Link passHref href="/">
          <FooterLink>{ready ? t("sell") : ""}</FooterLink>
        </Link>
        <Link passHref href="/">
          <FooterLink>{ready ? t("payment") : ""}</FooterLink>
        </Link>
        <Link passHref href="/">
          <FooterLink>{ready ? t("shipping") : ""}</FooterLink>
        </Link>
        {/* <Link passHref href="/">
          <FooterLink>{ready ? t("support") : ""}</FooterLink>
        </Link> */}
        <NextImage src="/visa-footer.png" alt="visa" height="20" width="62" />
        <NextImage
          src="/mastercard-footer.png"
          alt="mastercard"
          height="30"
          width="158"
        />
        <Copyright>© BagBag {year}</Copyright>
      </FooterBottom>
    </FooterRoot>
  );
};
