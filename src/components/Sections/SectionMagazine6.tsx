import React, { FC } from "react";
import { PostDataType } from "@/data/types";
import HeaderFilter from "./HeaderFilter";
import PostCardMeta from "@/components/PostCardMeta/PostCardMeta";
import CardAuthor2 from "@/components/CardAuthor2/CardAuthor2";
import Image from "next/image";
import Link from "next/link";
import { DEMO_POSTS } from "@/data/posts";

const MAGAZINE1_POSTS = DEMO_POSTS.filter((_, i) => i >= 8 && i < 16);

export interface SectionMagazine6Props {
  posts?: PostDataType[];
  heading?: string;
  className?: string;
}

const SectionMagazine6: FC<SectionMagazine6Props> = ({
  posts = MAGAZINE1_POSTS,
  heading = "Latest Articles 🎈 ",
  className = "",
}) => {
  const renderMain = () => {
    const { featuredImage, author, title, date, desc, href, readingTime } =
      posts[0];
    const subPosts = posts.filter((_, i) => i > 0);
    return (
      <main className="relative">
        {/* Image */}
        <div className="aspect-w-9 aspect-h-9 md:aspect-h-5 rounded-3xl lg:rounded-[40px] overflow-hidden">
          <Image
            fill
            alt=""
            sizes="(max-width: 1024px) 100vw, 1280px"
            src={featuredImage}
            className="object-cover"
          />
          <div>
            <span className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black"></span>
          </div>

          {/* CONTENT */}
          <div className="group dark absolute md:w-1/2 lg:w-2/3 max-w-2xl flex flex-col justify-end p-5 lg:p-14">
            <div className="">
              <h2 className="text-base md:text-xl lg:text-2xl xl:text-3xl font-semibold text-white hover:text-neutral-300">
                <Link href={href} className="line-clamp-3">
                  {title}
                </Link>
              </h2>
              <span className="hidden lg:block text-base text-neutral-200 mt-5">
                {desc}
              </span>
            </div>

            <div className="mt-7">
              <CardAuthor2
                readingTime={readingTime}
                date={date}
                author={author}
              />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="md:absolute mt-5 md:mt-0 h-96 md:h-auto md:right-3 md:top-3 md:bottom-3 md:w-1/2 lg:w-1/3 p-5 lg:p-8 bg-neutral-100 md:bg-white md:dark:bg-neutral-900 dark:bg-neutral-800 xl:bg-opacity-80 xl:dark:bg-opacity-80 xl:backdrop-filter xl:backdrop-blur-xl rounded-3xl lg:rounded-[34px] overflow-hidden">
          <div className="flow-root h-full w-full overflow-y-auto hiddenScrollbar">
            <div className="-my-5 md:-my-7 divide-y divide-neutral-200 dark:divide-neutral-700">
              {subPosts.map((post, i) => (
                <div key={i} className="block py-5 lg:py-7">
                  <h2 className="nc-card-title text-sm lg:text-base font-semibold">
                    <Link href={post.href} className="line-clamp-2">
                      {post.title}
                    </Link>
                  </h2>
                  <PostCardMeta
                    className="mt-4 text-xs sm:text-sm"
                    meta={post}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  };

  return (
    <div className={`nc-SectionMagazine6 ${className}`}>
      <HeaderFilter heading={heading} />
      {posts[0] && renderMain()}
    </div>
  );
};

export default SectionMagazine6;
