import Link from "next/link";
import React, { useState } from "react";
import NextImage from "../Image";
import {
  Logo,
  NavbarActions,
  NavbarContainer,
  NavbarLinks,
  NavbarRoot,
} from "./Navbar.styles";
import Search from "../icons/search.svg";
import Profile from "../icons/profile.svg";
import Bag from "../icons/bag.svg";
import useUser from "../../hooks/useUser";
import { Filters } from "../../types/common";
import { MenuIcon } from "../MenuIcon";
import { LaptopLVisible, MobileVisible } from "../../styles/layout";
import { MobileMenu } from "../MobileMenu";

export interface NavbarProps {
  filters: Filters;
}

export const Navbar = ({ filters }) => {
  const { user } = useUser();

  const [isOpen, setOpenedState] = useState(false);

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
              <a>
                <Bag height="40" width="40" />
                {user?.shopping_bag?.products?.length}
              </a>
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
