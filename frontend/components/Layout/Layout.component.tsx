import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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
  const { events, isFallback } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const enableLoader = () => setIsLoading(true);
  const disableLoader = () => setIsLoading(false);

  useEffect(() => {
    events.on("routeChangeStart", enableLoader);
    events.on("routeChangeComplete", disableLoader);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      events.off("routeChangeStart", enableLoader);
      events.off("routeChangeComplete", disableLoader);
    };
  }, [events]);

  return (
    <LayoutRoot id="layout">
      <Navbar filters={filters} />
      <div className="flex-grow">
        {!isFallback && children}
        {isLoading && <Loader />}
      </div>
      <Footer />
    </LayoutRoot>
  );
};
