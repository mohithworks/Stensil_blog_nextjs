import React, { ReactNode } from "react";
import { Sidebar } from "../Sidebar";
import SingleContent from "../SingleContent";
import SingleRelatedPosts from "../SingleRelatedPosts";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={`relative`}>
      {children}

      <div className="container flex flex-col my-10 lg:flex-row ">
        <div className="w-full lg:w-3/5 xl:w-2/3 xl:pr-20">
          <SingleContent />
        </div>
        <div className="w-full mt-12 lg:mt-0 lg:w-2/5 lg:pl-10 xl:pl-0 xl:w-1/3">
          <Sidebar />
        </div>
      </div>

      {/* RELATED POSTS */}
      <SingleRelatedPosts />
    </div>
  );
};

export default layout;
