import React from "react";
import useUser from "../../hooks/useUser";
import { Brand } from "../../types/brand";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { LayoutRoot } from "./Layout.styles";

export interface LayoutProps {
  categories: Brand[];
}

export const Layout: React.FC<LayoutProps> = ({ children, categories }) => {
  const { user, mutateUser } = useUser();
  return (
    <LayoutRoot>
      <Navbar />
      <div className="flex-grow">{children}</div>
      <Footer />
    </LayoutRoot>
  );
};
