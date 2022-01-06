import {
  FooterRoot,
  FooterBottom,
  FooterLink,
  Copyright,
  FooterEmail,
  FooterTop,
  SocialLink,
  InfoBlock,
} from "./Footer.style";
import Link from "next/link";
import Instagram from "../icons/insta.svg";
import Facebook from "../icons/fb.svg";
import { useTranslation } from "next-i18next";

export const Footer = () => {
  const { t } = useTranslation("footer");

  return (
    <FooterRoot>
      <FooterTop>
        <InfoBlock>
          <div className="h3">+7 999 355-35-35</div>
          <FooterEmail>hello@exbags.ru</FooterEmail>
        </InfoBlock>
        <address className="h4">{t("address")}</address>
        <FooterTop>
          <Link href="/">
            <SocialLink>
              <Instagram height="60" width="60" />
            </SocialLink>
          </Link>
          <Link href="/">
            <SocialLink style={{ marginLeft: "3.6rem" }}>
              <Facebook height="60" width="60" />
            </SocialLink>
          </Link>
        </FooterTop>
      </FooterTop>
      <FooterBottom>
        <Link href="/">
          <FooterLink>{t("catalogue")}</FooterLink>
        </Link>
        <Link href="/">
          <FooterLink>{t("sell")}</FooterLink>
        </Link>
        <Link href="/">
          <FooterLink>{t("payment")}</FooterLink>
        </Link>
        <Link href="/">
          <FooterLink>{t("shipping")}</FooterLink>
        </Link>
        <Link href="/">
          <FooterLink>{t("support")}</FooterLink>
        </Link>
        <Link href="/">
          <FooterLink>visa</FooterLink>
        </Link>
        <Link href="/">
          <FooterLink>mastercard</FooterLink>
        </Link>
        <Copyright>© (ex)bags 2021</Copyright>
      </FooterBottom>
    </FooterRoot>
  );
};
