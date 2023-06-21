"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import HeaderLogged from "@/components/Header/HeaderLogged";
import Header from "@/components/Header/Header";
import SubHeader2 from "@/components/Header/SubHeader2";
import { useThemeMode } from "@/hooks/useThemeMode";

const SiteHeader = () => {
  let pathname = usePathname();
  const darkMode = useThemeMode();

  const headerComponent = useMemo(() => {
    let HeadComponent = HeaderLogged;

    switch (pathname) {
      case "/home-2":
        HeadComponent = Header;
        break;
      case "/home-3":
        HeadComponent = SubHeader2;
        break;

      default:
        HeadComponent = SubHeader2;
        break;
    }

    return <HeadComponent />;
  }, [pathname]);

  return <>{headerComponent}</>;
};

export default SiteHeader;
