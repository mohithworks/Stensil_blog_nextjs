import React, { FC } from "react";

export interface ErrorProps {
  textSizeH?: string;
  textSizeSH?: string;
}

const NotFound: FC<ErrorProps> = ({
    textSizeH = "text-2xl md:text-2xl",
    textSizeSH = "text-1xl",
}) => {
  return (
    
    <div
        className={`nc-PageSingleTemp4Sidebar justify-center items-center text-center pt-10 pb-10 lg:pt-10 lg:pb-10`}
        data-nc-id="PageSingleTemp4Sidebar"
    >
        {/*  */}
        
        <div className="container justify-center items-center py-16 lg:py-20">
            {/* HEADER */}
            <header className="text-center max-w-2xl mx-auto space-y-7">
            <h2 className="text-6xl md:text-8xl">🪔</h2>
            <h1 className="text-6xl md:text-9xl font-semibold tracking-widest">
                404
            </h1>
            <span className="block text-sm text-neutral-800 sm:text-base dark:text-neutral-200 tracking-wider font-medium">
                THE PAGE YOU WERE LOOKING FOR DOESN&apos;T EXIST.{" "}
            </span>
            </header>
        </div>
    </div>
  );
};

export default NotFound;
