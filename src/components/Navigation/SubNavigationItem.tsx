"use client";

import { Popover, Transition } from "@/app/headlessui";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import React, { FC, Fragment, useState } from "react";
import { Route } from "@/routers/types";
import Link from "next/link";
import NcImage from "../NcImage/NcImage";

export interface NavigationItemProps {
  menuItem: any;
}

const SubNavigationItem: FC<NavigationItemProps> = ({ menuItem }) => {

  const renderMainItem = (item: any) => {
    return (
      <div className="h-20 flex-shrink-0 flex items-center">
        <Link
          className="inline-flex items-center text-sm lg:text-[15px] font-medium text-slate-700 dark:text-slate-300 py-2.5 px-4 xl:px-5 rounded-full hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          href={{
            pathname: item.link || undefined,
          }}
          target="_blank"
        >
          {item.name}
        </Link>
      </div>
    );
  };

  return <li className="menu-item flex-shrink-0">{renderMainItem(menuItem)}</li>;
};

export default SubNavigationItem;
