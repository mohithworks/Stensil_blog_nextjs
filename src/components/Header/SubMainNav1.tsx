"use client"

import React, { FC } from "react";
import SubLogo from "@/components/Logo/SubLogo";
import SubNavigation from "@/components/Navigation/SubNavigation";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import SwitchDarkMode from "@/components/SwitchDarkMode/SwitchDarkMode";
import SubSearchModal from "./SubSearchModal";
import Button from "../Button/Button";
import Link from "next/link";
import { useGlobalContext } from '@/context/GlobalContextProvider';
import { useThemeMode } from "@/hooks/useThemeMode";
import dynamic from "next/dynamic";

export interface MainNav1Props {}

const SubMenuBar = dynamic(() => import('@/components/MenuBar/SubMenuBar'), {
  ssr: false,
})

export const renderDarkMode = (darkmode: any, darkmodeState: any) => {

  const { toLight } = darkmodeState;

  if(darkmode === true) {
    return <SwitchDarkMode />
  } else {
    toLight();
  }
}

export const renderLogo = (author: any, darkmodeState: boolean) => {
  
    if(author[0].logoimg == null) { 
      return <Link href="/" className="ttnc-logo inline-block">
        <h2 className={`text-2xl md:text-2xl font-semibold`}>{author[0].metatitle.toUpperCase()}</h2>
      </Link>
    }else {
      if(darkmodeState === false) { 
        return <SubLogo img={author[0].logoimg} title={author[0].metatitle} />
      }else {
        if(author[0].logoimgdark != null) {
          return <SubLogo img={author[0].logoimgdark} title={author[0].metatitle} />
        }else {
          return <SubLogo img={author[0].logoimg} title={author[0].metatitle} />
        }
      }
    }
}

const SubMainNav1: FC<MainNav1Props> = ({}) => {
  const { author, nav } = useGlobalContext();  
  const darkmodeState = useThemeMode();
  
  var actualmenu = [], menuE = [], navmenus = [], socials = [], buttons:any = [];

  if(nav.length > 0) {
    
    actualmenu = nav[0]['navigation_menu']; 

    menuE = actualmenu.slice(0, actualmenu.length - 1);

    navmenus = nav[0]['cta'] === false ? actualmenu : menuE; 

    socials = nav[0]['social_icons']; 
    
    buttons = nav[0]['cta'] === false ? [] : [actualmenu[actualmenu.length - 1]]
  }

  return (
    <div className="nc-MainNav1 relative z-10 bg-white dark:bg-slate-900 ">
      <div className="container">
        <div className="h-20 py-5 flex justify-between items-center">

          <div className="flex justify-start flex-1 items-center space-x-4 sm:space-x-10 2xl:space-x-14">
            {renderLogo(author, darkmodeState['isDarkMode'])}
            {
                navmenus.length != 0 && <SubNavigation navigations={navmenus} className="hidden lg:flex" />
            }
          </div>

          <div className="flex-1 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1">
            <div className="hidden items-center lg:flex">
              <SwitchDarkMode />
              <SubSearchModal />
              <div className="px-1"></div>
              {
                buttons.length != 0 && (
                  <Link href={buttons[0].link} target="_blank">
                    <Button
                      sizeClass="py-3 px-4 sm:px-6"
                      pattern="primary"
                    >
                      {buttons[0].name}
                    </Button>
                  </Link>)
              }
            </div>
            <div className="flex items-center lg:hidden">
              <SubSearchModal />
              {
                navmenus.length > 0 ? 
                <div className="items-center md:hidden">
                  <SubMenuBar navigations={navmenus} socials={socials} authors={author} username={author[0].username} description={author[0].description} logo={author[0].logoimg} buttons={buttons} />
                </div>
                :
                <div className="flex md:hidden xl:hidden lg:hidden">
                  <SwitchDarkMode />
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubMainNav1;
