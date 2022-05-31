import { useRouter } from "next/router";
import React from "react";
import useFilters from "../../hooks/useFilters";
import useLoading from "../../hooks/useLoader";
import useUser from "../../hooks/useUser";
import { Footer } from "../Footer";
import { Loader } from "../Loader";
import { Navbar } from "../Navbar";
import { LayoutRoot } from "./Layout.styles";

export const Layout: React.FC = ({ children }) => {
  useUser();
  useFilters();
  const { isFallback } = useRouter();
  const { isLoading } = useLoading();

  return (
    <LayoutRoot id="layout">
      <Navbar />
      <div className="flex-grow">
        {!isFallback && children}
        {isLoading && <Loader />}
      </div>
      <Footer />
    </LayoutRoot>
  );
};
