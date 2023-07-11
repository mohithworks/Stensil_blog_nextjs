import React, { FC } from "react";
import { PostDataType } from "@/data/types";
import Avatar from "@/components/Avatar/Avatar";

export interface CardAuthor2Props {
  className?: string;
  hoverReadingTime?: boolean;
  readingTime?: number;
  author: any;
  date: any;
  type: any;
}

const SubCardAuthor2: FC<CardAuthor2Props> = ({
  className = "",
  author,
  date,
  hoverReadingTime = true,
  type
}) => {

  return (
    <div
      className={`nc-CardAuthor2 relative inline-flex items-center ${className}`}
      data-nc-id="CardAuthor2"
    >
      <Avatar
        sizeClass="h-10 w-10 text-base"
        containerClassName="flex-shrink-0 mr-3"
        radius="rounded-full"
        imgUrl={type === 'authors' ? author.users.avatar_url : author.avatar}
        userName={type === 'authors' ? author.users.full_name : author.name}
      />
      <div>
        <h2
          className={`text-sm text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium`}
        >
          {type === 'authors' ? author.users.full_name : author.name}
        </h2>
        <span
          className={`flex items-center mt-1 text-xs text-neutral-500 dark:text-neutral-400`}
        >
          <span>{date}</span>
        </span>
      </div>
    </div>
  );
};

export default SubCardAuthor2;
