import React from "react";
import useUser from "../../hooks/useUser";
import { Filters } from "../../types/common";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { LayoutRoot } from "./Layout.styles";

export interface LayoutProps {
  filters: Filters;
}

export const Layout: React.FC<LayoutProps> = ({ children, filters }) => {
  const { user, mutateUser } = useUser();
  return (
    <LayoutRoot id="layout">
      <Navbar filters={filters} />
      <div className="flex-grow">{children}</div>
      <Footer />
    </LayoutRoot>
  );
};
