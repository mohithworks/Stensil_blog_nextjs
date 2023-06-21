import React, { FC } from "react";
import NcImage from "@/components/NcImage/NcImage";
import { TaxonomyType, TwMainColor } from "@/data/types";
import Badge from "@/components/Badge/Badge";
import Link from "next/link";

export interface CardCategory2Props {
  className?: string;
  taxonomy: any;
  index?: string;
}

const SubCardCategory2: FC<CardCategory2Props> = ({
  className = "",
  taxonomy,
  index,
}) => {
  const { name, href, posts } = taxonomy;
  return (
    <Link
      href={href}
      className={`nc-CardCategory2 relative flex flex-col items-center justify-center text-center px-3 py-5 sm:p-6 bg-primary-100 dark:bg-neutral-900 rounded-3xl transition-colors ${className}`}
    >
      <div className="mt-3">
        <h2 className={`text-base font-semibold`}>{name}</h2>
        <span
          className={`block mt-1 text-sm text-neutral-500 dark:text-neutral-400`}
        >
          {posts} {posts > 1 ? 'Posts' : 'Post'}
        </span>
      </div>
    </Link>
  );
};

export default SubCardCategory2;
