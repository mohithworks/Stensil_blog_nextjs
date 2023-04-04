import React, { FC } from "react";
import NcImage from "@/components/NcImage/NcImage";
import PostCardMeta from "@/components/PostCardMeta/PostCardMeta";
import { PostDataType } from "@/data/types";
import PostTypeFeaturedIcon from "@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import Link from "next/link";

export interface Card13Props {
  className?: string;
  post: PostDataType;
}

const Card13: FC<Card13Props> = ({ className = "", post }) => {
  const { title, href, desc, featuredImage, date, postType } = post;

  return (
    <div className={`nc-Card13 relative flex justify-between ${className}`}>
      <div className="flex flex-col h-full py-2">
        <h2
          className={`nc-card-title block font-semibold text-sm sm:text-base`}
        >
          <Link href={href} className="line-clamp-2" title={title}>
            {title}
          </Link>
        </h2>
        <span className="hidden sm:block my-3 text-neutral-500 dark:text-neutral-400 ">
          <span className="line-clamp-2"> {desc}</span>
        </span>
        <span className="mt-4 block sm:hidden text-xs text-neutral-500 ">
          {date}
        </span>
        <div className="mt-auto hidden sm:block">
          <PostCardMeta meta={{ ...post }} />
        </div>
      </div>

      <Link
        href={href}
        className={`block relative h-full flex-shrink-0 w-24 sm:w-36 lg:w-40 xl:w-48 2xl:w-[200px] ml-4 sm:ml-5`}
      >
        <NcImage
          containerClassName="absolute inset-0"
          className="object-cover w-full h-full rounded-xl sm:rounded-3xl"
          src={featuredImage}
          fill
          alt={title}
        />
        <PostTypeFeaturedIcon
          className="absolute bottom-2 left-2"
          postType={postType}
          wrapSize="w-8 h-8"
          iconSize="w-4 h-4"
        />
      </Link>
    </div>
  );
};

export default Card13;
