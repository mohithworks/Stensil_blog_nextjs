"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import Tag from "@/components/Tag/Tag";
import SingleAuthor from "./SingleAuthor";
import SingleCommentForm from "./SingleCommentForm";
import SingleCommentLists from "./SingleCommentLists";
import SubSingleContentDemo from "./SubSingleContentDemo";
import { DEMO_TAGS } from "@/data/taxonomies";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import SectionSubscribe3 from "@/components/SectionSubscribe3/SectionSubscribe3";
import { ArrowUpIcon } from "@heroicons/react/24/solid";

const demoTags = DEMO_TAGS.filter((_, i) => i < 9);

export interface SingleContentProps {
    data: any;
}

const SubSingleContent: FC<SingleContentProps> = ({ data }) => {
  const endedAnchorRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLButtonElement>(null);
  //
  const [isShowScrollToTop, setIsShowScrollToTop] = useState<boolean>(false);
  //

  const endedAnchorEntry = useIntersectionObserver(endedAnchorRef, {
    threshold: 0,
    root: null,
    rootMargin: "0%",
    freezeOnceVisible: false,
  });

  useEffect(() => {
    const handleProgressIndicator = () => {
      const entryContent = contentRef.current;
      const progressBarContent = progressRef.current;

      if (!entryContent || !progressBarContent) {
        return;
      }

      const totalEntryH = entryContent.offsetTop + entryContent.offsetHeight;
      let winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      let scrolled = (winScroll / totalEntryH) * 100;

      progressBarContent.innerText = scrolled.toFixed(0) + "%";

      if (scrolled >= 100) {
        setIsShowScrollToTop(true);
      } else {
        setIsShowScrollToTop(false);
      }
    };

    const handleProgressIndicatorHeadeEvent = () => {
      window?.requestAnimationFrame(handleProgressIndicator);
    };
    handleProgressIndicator();
    window?.addEventListener("scroll", handleProgressIndicatorHeadeEvent);
    return () => {
      window?.removeEventListener("scroll", handleProgressIndicatorHeadeEvent);
    };
  }, []);

  const showLikeAndCommentSticky =
    !endedAnchorEntry?.intersectionRatio &&
    (endedAnchorEntry?.boundingClientRect.top || 0) > 0;

  return (
    <div className="relative">
      <div className="nc-SingleContent space-y-5">
        {/* ENTRY CONTENT */}
        <div
          id="single-entry-content"
          className="prose lg:prose-lg !max-w-screen-md mx-auto dark:prose-invert"
          ref={contentRef}
        >
          <SubSingleContentDemo data={data} />
        </div>

      </div>
      <div className="container">
        <SectionSubscribe3 className="pt-16 pb-2 lg:pt-28" />
      </div>
      <div
        className={`sticky mt-8 bottom-8 z-40 justify-end flex
        }`}
      >
        <div className="bg-primary-700  dark:bg-neutral-800 shadow-lg rounded-full ring-1 ring-offset-1 ring-neutral-900/5 p-1.5 flex items-center justify-center space-x-2 text-xs">

          <button
            className={`w-10 h-10 items-center justify-center text-white rounded-full ${
              isShowScrollToTop ? "flex" : "hidden"
            }`}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <ArrowUpIcon className="w-4 h-4" />
          </button>

          <button
            ref={progressRef}
            className={`w-8 h-10 text-white items-center justify-center ${
              isShowScrollToTop ? "hidden" : "flex"
            }`}
            title="Go to top"
          >
            %
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubSingleContent;
