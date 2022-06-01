import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  NavbarActions,
  NavbarContainer,
  NavbarLinks,
  NavbarRoot,
  BagContainer,
  Logo,
  NavbarMainLink,
} from "./Navbar.styles";
// import Search from "../icons/search.svg";
import CatalogueBorder from "../icons/hover-oval.svg";
import OfferBorder from "../icons/hover.svg";
import AboutBorder from "../icons/hover-round.svg";
import ContactsBorder from "../icons/hover_zigzag.svg";
import Profile from "../icons/profile.svg";
import Bag from "../icons/bag.svg";
import useUser from "../../hooks/useUser";
import { MenuIcon } from "../MenuIcon";
import { LaptopLVisible, MobileVisible } from "../../styles/layout";
import { useRouter } from "next/router";
import { MobileMenu } from "./MobileMenu.component";
import LogoImg from "../icons/logo.svg";
import { useTranslation } from "next-i18next";
import { CatalogueMenu } from "../CatalogueMenu";

export const Navbar = () => {
  const { user } = useUser();
  const { query, route } = useRouter();
  const [isOpen, setOpenedState] = useState(false);
  const { t, ready } = useTranslation("common");
  const [isCatalogueOpen, setCatalogueOpenedState] = useState(false);

  useEffect(() => {
    setOpenedState(false);
    setCatalogueOpenedState(false);
  }, [query]);

  return (
    <>
      <MenuIcon
        isOpen={isOpen}
        onClick={() => setOpenedState((prev) => !prev)}
      />
      <NavbarRoot id="top-menu">
        <NavbarContainer>
          <Link href="/" passHref>
            <Logo>
              <LogoImg />
            </Logo>
          </Link>
          <NavbarLinks>
            <NavbarMainLink
              onClick={() => setCatalogueOpenedState((state) => !state)}
              $selected={route === "/catalogue"}
            >
              <CatalogueBorder />
              {ready ? t("catalog") : ""}
            </NavbarMainLink>
            <Link href="/offer" passHref>
              <NavbarMainLink $selected={route === "/offer"}>
                <OfferBorder />
                {ready ? t("sell") : ""}
              </NavbarMainLink>
            </Link>
            <Link href="/about" passHref>
              <NavbarMainLink $selected={route === "/about"}>
                <AboutBorder />
                {ready ? t("about") : ""}
              </NavbarMainLink>
            </Link>
            <Link href="/contacts" passHref>
              <NavbarMainLink $selected={route === "/contacts"}>
                <ContactsBorder />
                {ready ? t("contacts") : ""}
              </NavbarMainLink>
            </Link>
          </NavbarLinks>
          <NavbarActions>
            {/* <LaptopLVisible>
              <Link href="/">
                <a>
                  <Search height="36" width="36" />
                </a>
              </Link>
            </LaptopLVisible> */}
            <Link href="/profile">
              <a>
                <Profile />
              </a>
            </Link>
            <Link href="/cart" passHref>
              <BagContainer>
                <span>
                  <Bag height="40" width="40" />
                  <b>{user?.shopping_bag?.products?.length || 0}</b>
                </span>
              </BagContainer>
            </Link>
          </NavbarActions>
        </NavbarContainer>
      </NavbarRoot>
      <MobileVisible>
        <MobileMenu isOpen={isOpen} />
      </MobileVisible>
      <CatalogueMenu isOpen={isCatalogueOpen} />
    </>
  );
};
