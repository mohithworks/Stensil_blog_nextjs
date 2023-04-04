import React, { FC } from "react";
import { PostDataType } from "@/data/types";
import SocialsShare from "@/components/SocialsShare/SocialsShare";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import PostTypeFeaturedIcon from "@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import Link from "next/link";
import Image from "next/image";

export interface Card8Props {
  className?: string;
  post: PostDataType;
}

const Card8: FC<Card8Props> = ({ className = "h-full", post }) => {
  const { title, href, featuredImage, desc, categories, postType } = post;

  return (
    <div
      className={`nc-Card8 group relative rounded-3xl overflow-hidden z-0 ${className}`}
    >
      <SocialsShare className="absolute hidden md:grid gap-[5px] right-4 top-4 opacity-0 z-[-1] group-hover:z-10 group-hover:opacity-100 transition-all duration-300" />
      <Link
        href={href}
        className="block w-full h-0 pt-[100%] sm:pt-[55%] rounded-xl overflow-hidden z-0"
      >
        <Image
          className="object-cover"
          src={featuredImage}
          alt={title}
          fill
          sizes="(max-width: 600px) 480px, 800px"
        />
        <PostTypeFeaturedIcon
          className="absolute top-4 left-4"
          postType={postType}
          wrapSize="w-8 h-8"
          iconSize="w-4 h-4"
        />
      </Link>
      <Link
        href={href}
        className="absolute inset-x-0 bottom-0 top-1/3 hover:top-5 bg-gradient-to-t from-black opacity-60 group-hover:opacity-70 transition-opacity"
      ></Link>
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 flex flex-col">
        <Link href={href} className="absolute inset-0" />
        <CategoryBadgeList categories={categories} />
        <h2
          className={`mt-3 relative block font-semibold text-neutral-50 text-lg sm:text-2xl`}
        >
          <Link href={href} className="line-clamp-3" title={title}>
            {title}
          </Link>
        </h2>
        <div className="hidden sm:block mt-2">
          <span className="text-neutral-300 text-sm line-clamp-1">{desc}</span>
        </div>
      </div>
    </div>
  );
};

export default Card8;
