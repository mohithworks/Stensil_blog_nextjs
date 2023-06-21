"use client";

import React, { FC, useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";

export interface SingleMetaAction2Props {
  className?: string;
  meta?: any
}

const SubSingleMetaAction2: FC<SingleMetaAction2Props> = ({ className = "", meta }) => {
  
  const { title, href } = meta;

  const shareUrl = (typeof window !== "undefined") ? window.location.origin + href : '';

  const [snackMsg, setsnackMsg] = useState<any>("");
  const [snackDuration, setsnackDuration] = useState<any>();
  const [snackStatus, setsnackStatus] = useState<any>(false);

  const copyLink = (e:any) => {
    e.preventDefault();
    navigator.clipboard.writeText(shareUrl);
    setsnackMsg('Link Copied');
    setsnackStatus(true);
       setTimeout(() => {
       setsnackStatus(false);
    }, 1000);
  }
    
  return (
    <div className={`nc-SingleMetaAction2 ${className}`}>
      <div className="flex flex-row space-x-2.5 items-center">
        <FacebookShareButton 
            url={shareUrl}
            quote={title}
            className=""
        >
          <div className=" flex items-center justify-center focus:outline-none h-8 w-8 bg-neutral-200 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-full">
            <i className={`${`lab la-facebook-f`}`} ></i>
          </div>
        </FacebookShareButton>
        <LinkedinShareButton
            title={title}
            url={shareUrl}
            className="flex-shrink-0 flex items-center justify-center focus:outline-none h-9 w-9 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-full"
        >
            <div className=" flex items-center justify-center focus:outline-none h-8 w-8 bg-neutral-200 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-full">
              <i className={`${`lab la-linkedin-in`}`} ></i>
            </div>
        </LinkedinShareButton>
        <TwitterShareButton
            title={title}
            url={shareUrl}
        >
            <div className=" flex items-center justify-center focus:outline-none h-8 w-8 bg-neutral-200 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-full">
              <i className={`${`lab la-twitter`}`} ></i>
            </div>
        </TwitterShareButton>
        <WhatsappShareButton
            title={title}
            url={shareUrl}
        >
            <div className=" flex items-center justify-center focus:outline-none h-8 w-8 bg-neutral-200 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-full">
              <i className={`${`lab la-whatsapp`}`} ></i>
            </div>
        </WhatsappShareButton>
        <button
            className={` flex items-center justify-center focus:outline-none h-8 w-8 bg-neutral-200 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-full`}
            data-nc-id="NcBookmark"
            title="Save to reading list"
            onClick={copyLink}
        >
            <i className={`${`las la-copy`} text-base`}></i>
        </button>
        <Snackbar
          open={snackStatus}
          autoHideDuration={snackDuration}
          message={snackMsg}
        />
      </div>
    </div>
  );
};

export default SubSingleMetaAction2;
