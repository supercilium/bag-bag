import Link from "next/link";
import {
  ButtonBack,
  MobileMenuFooter,
  MobileMenuRoot,
  SocialLink,
  SubMenu,
} from "../MobileMenu/MobileMenu.styles";
// import Instagram from "../icons/insta.svg";
// import Facebook from "../icons/fb.svg";
import TelegramIcon from "../icons/telegram.svg";
import Arrow from "../icons/arrow-simple-right.svg";
import { useEffect, useState } from "react";
import { size } from "../../styles/constants";
import { InfoBlock } from "../InfoBlock";
import { Filters } from "../../types/common";
import { MenuItem } from "../MobileMenu/components";
import { useDimensions } from "../../hooks/useDimensions";
import useLoading from "../../hooks/useLoader";
import { Loader } from "../Loader";

export interface MobileMenuProps {
  isOpen: boolean;
  filters: Filters;
}

export interface ScreenSize {
  width: number;
  height: number;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, filters }) => {
  const [isSubMenuOpened, setSubMenuState] = useState(false);
  const screenSize = useDimensions();
  const isWideScreen = screenSize.width >= size.laptop;
  const { isLoading } = useLoading();

  useEffect(() => {
    if (!isWideScreen) {
      if (isOpen) {
        document.getElementById("layout").classList.add("layout-fixed");
      } else {
        document.getElementById("layout").classList.remove("layout-fixed");
        setSubMenuState(false);
      }
    }
  }, [isWideScreen, isOpen]);

  return (
    <MobileMenuRoot
      $isOpen={isOpen}
      $screenWidth={screenSize.width}
      $isOpenSubMenu={isSubMenuOpened}
    >
      <menu>
        <div>
          <MenuItem onClick={() => setSubMenuState(true)}>каталог</MenuItem>
          <MenuItem>
            <Link href="/offer">
              <a>Продать</a>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="/about">
              <a>О нас</a>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="/contacts">
              <a>Контакты</a>
            </Link>
          </MenuItem>
        </div>
        <SubMenu
          style={{
            transform: `translateX(
              ${isSubMenuOpened ? -screenSize.width : 0}px
            )`,
          }}
        >
          <ButtonBack onClick={() => setSubMenuState(false)}>
            <Arrow />
            Назад
          </ButtonBack>
          <div>
            {filters?.categories?.map((item) => (
              <Link
                key={item.slug}
                href={`/catalogue?category.id=${item.id}&_sort=views:DESC`}
              >
                <a>{item.name}</a>
              </Link>
            ))}
          </div>
          <InfoBlock
            title="коллекции"
            content={
              <>
                {filters?.collections?.map((item) => (
                  <Link key={item.slug} href={`/collection/${item.slug}`}>
                    <a>{item.name}</a>
                  </Link>
                ))}
              </>
            }
          />
          <InfoBlock
            title="бренды"
            content={
              <>
                {filters?.brands.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/catalogue?brand.id=${item.id}&_sort=views:DESC`}
                  >
                    <a>{item.name}</a>
                  </Link>
                ))}
              </>
            }
          />
          {isLoading && <Loader />}
        </SubMenu>
        {isLoading && <Loader />}
      </menu>
      <MobileMenuFooter>
        {/* <Link href="/">
          <SocialLink>
            <Instagram height="24" width="24" />
          </SocialLink>
        </Link>
        <Link href="/">
          <SocialLink>
            <Facebook height="24" width="24" />
          </SocialLink>
        </Link> */}
        <Link passHref href="/">
          <SocialLink>
            <TelegramIcon height="24" width="24" />
          </SocialLink>
        </Link>

        <address>
          <p>+7 999 355-35-35</p>
          <p>
            <i>hello@exbags.ru</i>
          </p>
        </address>
      </MobileMenuFooter>
    </MobileMenuRoot>
  );
};
