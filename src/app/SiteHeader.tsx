"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import HeaderLogged from "@/components/Header/HeaderLogged";
import Header from "@/components/Header/Header";
import Header2 from "@/components/Header/Header2";
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
        HeadComponent = Header2;
        break;

      default:
        HeadComponent = Header2;
        break;
    }

    return <HeadComponent />;
  }, [pathname]);

  return <>{headerComponent}</>;
};

export default SiteHeader;
