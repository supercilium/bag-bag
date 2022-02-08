import React from "react";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { LayoutRoot } from "./Layout.styles";

export interface LayoutProps {
  categories: any[];
}

export const Layout: React.FC<LayoutProps> = ({ children, categories }) => {
  return (
    <LayoutRoot>
      <Navbar />
      <div className="flex-grow">{children}</div>
      <Footer />
    </LayoutRoot>
  );
};
