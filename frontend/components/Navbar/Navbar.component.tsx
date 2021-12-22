import Link from "next/link"
import React from "react"
import NextImage from "../Image"
import {
  NavbarActions,
  NavbarContainer,
  NavbarLinks,
  NavbarRoot,
} from "./Navbar.styles"
import Search from "../icons/search.svg"
import Profile from "../icons/profile.svg"
import Bag from "../icons/bag.svg"

export interface NavbarProps {
  categories: any[]
}

export const Navbar = () => {
  return (
    <NavbarRoot>
      <NavbarContainer>
        <Link href="/">
          <a>
            <NextImage src="/logo.png" alt="home" height="42" width="173" />
          </a>
        </Link>
        <NavbarLinks>
          <Link href="/">
            <a>Каталог</a>
          </Link>
          <Link href="/">
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
          <Link href="/">
            <a>
              <Search height="36" width="36" />
            </a>
          </Link>
          <Link href="/login">
            <a>
              <Profile height="36" width="36" />
            </a>
          </Link>
          <Link href="/">
            <a>
              <Bag height="40" width="40" />
            </a>
          </Link>
        </NavbarActions>
      </NavbarContainer>
    </NavbarRoot>
  )
}
