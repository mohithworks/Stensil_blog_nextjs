"use client"

import React from "react";
import SubSocialsList from "@/components/SocialsList/SubSocialsList";
import { CustomLink } from "@/data/types";
import { renderLogo } from "@/components/Header/SubMainNav1";
import { useThemeMode } from "@/hooks/useThemeMode";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

export interface SubFooterProps {
    menus: any,
    authors: any,
}

const SubFooter: React.FC<SubFooterProps> = ({ authors, menus }) => {

  const socials = menus.length > 0 ? menus[0]['social_icons'] : [];
  const darkmodeState = useThemeMode();

  return (
    <div className="nc-Footer bg-white dark:bg-slate-900 justify-end relative py-8 lg:py-8 border-t border-neutral-200 dark:border-neutral-700">
        <div className="flex flex-col items-center text-center justify-center md:flex-row md:justify-between">
            <div className="flex md:ml-5">
                {renderLogo(authors, darkmodeState['isDarkMode'])}
            </div>
            <p className="mt-5 text-sm px-5 md:mr-5 md:px-0">Copyright&nbsp;<span className="font-semibold">© 2022, {authors[0].metatitle}. All rights reserved</span></p>
            {
                menus.length > 0 && socials.length > 0 && 
                <div className="flex mt-5 mr-0 md:mr-10">
                    <SubSocialsList socials={socials} itemClass="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-200 text-xl dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200" />
                </div>
            }
        </div>
    </div>
  );
};

export default SubFooter;
