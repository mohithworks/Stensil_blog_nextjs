"use client";

import SubCard2 from "@/components/Card2/SubCard2";
import TitleHeading from "@/components/Heading/TitleHeading";
import { PostDataType } from "@/data/types";
import React, { FC, useState } from "react";

export interface SectionLargeSliderProps {
  className?: string;
  heading?: string;
  desc?: string;
  posts: PostDataType[];
  type?: any,
}
const SectionLargeSlider: FC<SectionLargeSliderProps> = ({
  posts,
  heading = "Editor's pick",
  desc = "Discover the most outstanding articles in all topics of life. ",
  type = "default",
  className = "",
}) => {
  const [indexActive, setIndexActive] = useState(0);

  const handleClickNext = () => {
    setIndexActive((state) => {
      if (state >= posts.length - 1) {
        return 0;
      }
      return state + 1;
    });
  };

  const handleClickPrev = () => {
    setIndexActive((state) => {
      if (state === 0) {
        return posts.length - 1;
      }
      return state - 1;
    });
  };

  const authorPosts:any = posts;

  return (
    <div className={`relative ${className}`}>
      <div className="text-center">
        {!!heading && <TitleHeading desc={desc}>{heading}</TitleHeading>}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-0">
        {authorPosts != undefined && posts.map((item, index) => {
          return (
            <SubCard2
              key={index}
              size="large"
              posts={item}
            />
          )
        })}
      </div>
    </div>
  );
};

export default SectionLargeSlider;
