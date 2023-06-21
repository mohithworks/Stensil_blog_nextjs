import React, { FC } from "react";
import SubNavigationItem from "./SubNavigationItem";
import { NAVIGATION_DEMO_2 } from "@/data/navigation";

interface Props {
  className?: string;
  navigations: any;
}

const SubNavigation: FC<Props> = ({ className = "flex", navigations }) => {
  return (
    <ul className={`nc-Navigation items-center ${className}`}>
      {navigations.map((item:any, index:any) => (
        <SubNavigationItem key={index} menuItem={item} />
      ))}
    </ul>
  );
};

export default SubNavigation;
