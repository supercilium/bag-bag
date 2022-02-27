import { MenuIconRoot } from "./MenuIcon.styles";

export interface MenuIconProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen: boolean;
}

export const MenuIcon: React.FC<MenuIconProps> = ({ onClick, isOpen }) => {
  return (
    <MenuIconRoot onClick={onClick} $isOpen={isOpen}>
      <div>
        <span />
        <span />
      </div>
    </MenuIconRoot>
  );
};
