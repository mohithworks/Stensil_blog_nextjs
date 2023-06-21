"use client"
import React, { FC, useState } from "react";
import PostCardSaveAction from "@/components/PostCardSaveAction/PostCardSaveAction";
import { PostDataType } from "@/data/types";
import PostCardLikeAndComment from "@/components/PostCardLikeAndComment/PostCardLikeAndComment";
import SubCategoryBadgeList from "@/components/CategoryBadgeList/SubCategoryBadgeList";
import PostTypeFeaturedIcon from "@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import PostFeaturedMedia from "@/components/PostFeaturedMedia/PostFeaturedMedia";
import Link from "next/link";
import Image from "next/image";
import htmltoText from "@/utils/htmltoText";
import { useReadingTime } from "react-hook-reading-time";

export interface Card9Props {
  className?: string;
  ratio?: string;
  posts: any;
  postHref?: any;
  hoverClass?: string;
}

const SubCard9: FC<Card9Props> = ({
  className = "h-full",
  ratio = "aspect-w-3 aspect-h-3 sm:aspect-h-4",
  posts,
  postHref,
  hoverClass = "",
}) => {
  const { title, featured_imgsd, created_at, category, post } = posts;
  const [date, setDate] = useState(new Date(created_at).toLocaleString('en-us',{month:'short', day:'numeric', year:'numeric'}));

  const { text } = useReadingTime(htmltoText(post));

  const renderMeta = () => {
    return (
      <div className="inline-flex items-center text-xs text-neutral-300">
        <div className="block ">
          <h2 className="block text-base sm:text-lg font-semibold text-white ">
            <span className="line-clamp-2" title={title}>
              {title}
            </span>
          </h2>
          <div className="flex mt-2.5 relative">
            <span className="font-normal truncate">{date}</span>
            <span className="mx-[6px] font-medium">·</span>
            <span className="dark:text-neutral-300">
              {text}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-Card9 relative flex flex-col group rounded-3xl overflow-hidden z-0 ${hoverClass} ${className}`}
    >
      <div className={`flex items-start relative w-full ${ratio}`}></div>
        <Link href={postHref}>
          <Image
            fill
            alt={title}
            className="object-cover w-full h-full rounded-3xl"
            src={featured_imgsd}
            sizes="(max-width: 600px) 480px, 500px"
          />
          <span className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
        </Link>
      <Link
        href={postHref}
        className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black opacity-50"
      ></Link>
      <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col flex-grow">
        <Link href={postHref} className="absolute inset-0"></Link>
        <div className="mb-3">
            <SubCategoryBadgeList categories={category} />
        </div>
        {renderMeta()}
      </div>
    </div>
  );
};

export default SubCard9;
