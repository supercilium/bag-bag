import { useRouter } from "next/router";
import React from "react";
import useUser from "../../hooks/useUser";
import { Filters } from "../../types/common";
import { Footer } from "../Footer";
import { Loader } from "../Loader";
import { Navbar } from "../Navbar";
import { LayoutRoot } from "./Layout.styles";

export interface LayoutProps {
  filters: Filters;
}

export const Layout: React.FC<LayoutProps> = ({ children, filters }) => {
  const { user } = useUser();
  const { isFallback } = useRouter();

  return (
    <LayoutRoot id="layout">
      <Navbar filters={filters} />
      <div className="flex-grow">{isFallback ? <Loader /> : children}</div>
      <Footer />
    </LayoutRoot>
  );
};
