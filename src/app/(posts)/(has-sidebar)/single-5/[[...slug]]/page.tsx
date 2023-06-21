import SingleHeader from "@/app/(singles)/SingleHeader";
import NcImage from "@/components/NcImage/NcImage";
import React from "react";

const PageSingleSidebar = ({}) => {
  return (
    <>
      {/* SINGLE HEADER */}
      <header className="container rounded-xl pt-10 lg:pt-16">
        <div className="max-w-screen-md mx-auto">
          <SingleHeader hiddenDesc />
        </div>

        {/* FEATURED IMAGE */}
        <NcImage
          alt="single"
          containerClassName="my-10 sm:my-12"
          className="object-cover w-full rounded-3xl"
          src="https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg"
          width={1260}
          height={750}
          sizes="(max-width: 1024px) 100vw, 1280px"
        />
      </header>
    </>
  );
};

export default PageSingleSidebar;
