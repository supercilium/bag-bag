import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  NavbarActions,
  NavbarContainer,
  NavbarLinks,
  NavbarRoot,
  BagContainer,
  Logo,
} from "./Navbar.styles";
import Search from "../icons/search.svg";
import Profile from "../icons/profile.svg";
import Bag from "../icons/bag.svg";
import useUser from "../../hooks/useUser";
import { Filters } from "../../types/common";
import { MenuIcon } from "../MenuIcon";
import { LaptopLVisible, MobileVisible } from "../../styles/layout";
import { useRouter } from "next/router";
import { MobileMenu } from "./MobileMenu.component";
import LogoImg from "../icons/logo.svg";

export interface NavbarProps {
  filters: Filters;
}

export const Navbar = ({ filters }) => {
  const { user } = useUser();
  const { query } = useRouter();

  const [isOpen, setOpenedState] = useState(false);

  useEffect(() => {
    setOpenedState(false);
  }, [query]);

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
              <LogoImg />
            </Logo>
          </Link>
          <NavbarLinks>
            <Link href="/catalogue?_sort=views:DESC">
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
                <span>
                  <Bag height="40" width="40" />
                  <b>{user?.shopping_bag?.products?.length}</b>
                </span>
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
