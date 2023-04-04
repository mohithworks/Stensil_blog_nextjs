import React, { FC } from "react";
import { SectionMagazine1Props } from "./SectionMagazine1";
import HeaderFilter from "./HeaderFilter";
import Card2 from "@/components/Card2/Card2";
import Card9 from "@/components/Card9/Card9";

export interface SectionMagazine3Props extends SectionMagazine1Props {}

const SectionMagazine3: FC<SectionMagazine3Props> = ({
  posts,
  heading = "Latest Articles 🎈 ",
  className = "",
}) => {
  return (
    <div className={`nc-SectionMagazine3 ${className}`}>
      <HeaderFilter heading={heading} />

      {!posts.length && <span>Nothing we found!</span>}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {posts[0] && <Card2 size="large" post={posts[0]} />}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {posts
            .filter((_, i) => i < 5 && i >= 1)
            .map((item, index) => (
              <Card9 ratio="aspect-w-3 aspect-h-3" key={index} post={item} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SectionMagazine3;
