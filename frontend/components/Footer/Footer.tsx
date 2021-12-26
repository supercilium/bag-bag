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

export const Footer = () => {
  return (
    <FooterRoot>
      <FooterTop>
        <InfoBlock>
          <div className="h3">+7 999 355-35-35</div>
          <FooterEmail>hello@exbags.ru</FooterEmail>
        </InfoBlock>
        <address className="h4">
          198735 Москва,
          <br />
          Коломяжский пр., 17к2,
          <br />2 этаж, 304 бутик
        </address>
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
          <FooterLink>Каталог</FooterLink>
        </Link>
        <Link href="/">
          <FooterLink>продать</FooterLink>
        </Link>
        <Link href="/">
          <FooterLink>оплата</FooterLink>
        </Link>
        <Link href="/">
          <FooterLink>доставка</FooterLink>
        </Link>
        <Link href="/">
          <FooterLink>служба поддержки</FooterLink>
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
