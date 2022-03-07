import Link from "next/link";
import React, { useEffect, useState } from "react";
import NextImage from "../Image";
import {
  Logo,
  NavbarActions,
  NavbarContainer,
  NavbarLinks,
  NavbarRoot,
  BagContainer,
} from "./Navbar.styles";
import Search from "../icons/search.svg";
import Profile from "../icons/profile.svg";
import Bag from "../icons/bag.svg";
import useUser from "../../hooks/useUser";
import { Filters } from "../../types/common";
import { MenuIcon } from "../MenuIcon";
import { LaptopLVisible, MobileVisible } from "../../styles/layout";
import { MobileMenu } from "../MobileMenu";
import { useRouter } from "next/router";

export interface NavbarProps {
  filters: Filters;
}

export const Navbar = ({ filters }) => {
  const { user } = useUser();
  const { query } = useRouter();

  const [isOpen, setOpenedState] = useState(false);

  useEffect(() => {
    setOpenedState(false);
  }, [query?.slug]);

  return (
    <>
      <MenuIcon
        isOpen={isOpen}
        onClick={() => setOpenedState((prev) => !prev)}
      />
      <NavbarRoot>
        <NavbarContainer>
          <Link href="/">
            <Logo>
              <NextImage src="/logo.png" alt="home" layout="fill" />
            </Logo>
          </Link>
          <NavbarLinks>
            <Link href="/catalogue">
              <a>Каталог</a>
            </Link>
            <Link href="/offer">
              <a>Продать</a>
            </Link>
            <Link href="/">
              <a>О нас</a>
            </Link>
            <Link href="/">
              <a>Контакты</a>
            </Link>
          </NavbarLinks>
          <NavbarActions>
            <LaptopLVisible>
              <Link href="/">
                <a>
                  <Search height="36" width="36" />
                </a>
              </Link>
            </LaptopLVisible>
            <Link href="/profile">
              <a>
                <Profile />
              </a>
            </Link>
            <Link href="/cart">
              <BagContainer>
                <Bag height="40" width="40" />
                <b>{user?.shopping_bag?.products?.length}</b>
              </BagContainer>
            </Link>
          </NavbarActions>
        </NavbarContainer>
      </NavbarRoot>
      <MobileVisible>
        <MobileMenu filters={filters} isOpen={isOpen} />
      </MobileVisible>
    </>
  );
};
