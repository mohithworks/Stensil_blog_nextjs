import React from "react";
import logoImg from "@/images/logo.png";
import logoLightImg from "@/images/logo-light.png";
import LogoSvg from "./LogoSvg";
import Link from "next/link";
import Image from "next/image";

export interface LogoProps {
  img: string;
  title: string;
}

const SubLogo: React.FC<LogoProps> = ({
  img = logoImg,
  title,
}) => {
  return (
    <Link
      href="/"
      className="ttnc-logo relative text-primary-6000 flex-shrink-0 w-auto h-14 sm:h-12 md:h-12 text-neutral-400"
    >
      {/* THIS USE FOR MY MULTI DEMO */}
      {/* IF YOU ARE MY CLIENT. PLESE DELETE THIS CODE AND YOU YOUR IMAGE PNG BY BELLOW CODE */}
       <Image
            width={100}
            height={50}
            src={img}
            alt={title}
            className="object-contain h-full w-full"
       />
    </Link>
  );
};

export default SubLogo;
