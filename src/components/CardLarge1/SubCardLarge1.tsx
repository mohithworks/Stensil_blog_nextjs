"use client"

import { useState } from "react";
import PostCardSaveAction from "@/components/PostCardSaveAction/PostCardSaveAction";
import NcImage from "@/components/NcImage/NcImage";
import NextPrev from "@/components/NextPrev/NextPrev";
import PostCardLikeAndComment from "@/components/PostCardLikeAndComment/PostCardLikeAndComment";
import { PostDataType } from "@/data/types";
import React, { FC } from "react";
import SubCardAuthor2 from "@/components/CardAuthor2/SubCardAuthor2";
import SubCategoryBadgeList from "@/components/CategoryBadgeList/SubCategoryBadgeList";
import PostTypeFeaturedIcon from "@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import Link from "next/link";

export interface CardLarge1Props {
  className?: string;
  posts: any;
  onClickNext?: () => void;
  onClickPrev?: () => void;
}

const SubCardLarge1: FC<CardLarge1Props> = ({
  className = "",
  posts,
  onClickNext = () => {},
  onClickPrev = () => {},
}) => {
  const { title, featured_imghd, href, created_at, category, post, authors, refauthors } = posts;
  const [date, setDate] = useState(new Date(created_at).toLocaleString('en-us',{month:'short', day:'numeric', year:'numeric'}));

  return (
    <div
      className={`nc-CardLarge1 nc-CardLarge1--hasAnimation relative flex flex-col justify-center items-center ${className}`}
    >
      <div className="w-full md:w-5/5 lg:w-3/3">
        <Link href={href} className="nc-CardLarge1__right block relative">
          <NcImage
            containerClassName="aspect-w-16 aspect-h-12 sm:aspect-h-9 md:aspect-h-14 lg:aspect-h-10 2xl:aspect-h-9 relative"
            className="absolute inset-0 object-cover rounded-3xl"
            src={featured_imghd}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* META TYPE */}
          {/* <PostTypeFeaturedIcon
            postType={post.postType}
            className="absolute w-8 h-8 md:w-10 md:h-10 right-6 top-6"
          /> */}
        </Link>
      </div>
      <div className="w-full z-10 md:mt-0 px-3 sm:px-6 md:px-0 md:w-6/6 lg:w-2/2 xl:w-5/5">
        <div className="nc-CardLarge1__left p-4 -mt-10 sm:p-8 xl:py-14 md:px-10 bg-white/40 dark:bg-neutral-900/40 backdrop-filter backdrop-blur-lg shadow-lg dark:shadow-2xl rounded-3xl space-y-3 sm:space-y-5 ">
          <SubCategoryBadgeList categories={category} />

          <h2 className="nc-card-title text-base sm:text-xl lg:text-2xl font-semibold ">
            <Link href={href} className="line-clamp-2" title={title}>
              {title}
            </Link>
          </h2>

          <SubCardAuthor2 className="relative my-4" type={refauthors.id === '153de11c-9ce8-4d79-9d19-c10da778e84c' ? 'authors': 'refauthors'} author={refauthors.id === '153de11c-9ce8-4d79-9d19-c10da778e84c' ? authors : refauthors} date={date} />

          {/* <div className="flex items-center justify-between mt-auto">
            <PostCardLikeAndComment />
            <PostCardSaveAction bookmarkClass="h-8 w-8 bg-neutral-50/30 hover:bg-neutral-50/50 dark:bg-neutral-800/30 dark:hover:bg-neutral-800/50" />
          </div> */}
        </div>
        {/* <div className="p-4 sm:pt-8 sm:px-10">
          <NextPrev
            btnClassName="w-11 h-11 text-xl"
            onClickNext={onClickNext}
            onClickPrev={onClickPrev}
          />
        </div> */}
      </div>
    </div>
  );
};

export default SubCardLarge1;
