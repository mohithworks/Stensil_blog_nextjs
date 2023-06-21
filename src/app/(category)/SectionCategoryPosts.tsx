"use client";

import React, { FC, useState, useEffect } from "react";
import Heading from "@/components/Heading/Heading";
import { XMarkIcon } from "@heroicons/react/24/solid";
import IconButton from '@mui/material/IconButton';
import SubCard11 from "@/components/Card11/SubCard11";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Error from "@/components/Error/Error";
import Loading from "@/components/Loading/Loading";
import supabaseClient from "@/utils/supabaseClient";
import Snackbar from '@mui/material/Snackbar';

export interface SectionArticlesProps {
  categoryslug: string;
  domain1: string;
  domain2: string;
  currentPosts: any;
  totalPosts: number;
  maxPost: number;
}

var inPage:any = 11, fnPage:any = 21, postsLoc:any = [];

const SectionCategoryPosts: FC<SectionArticlesProps> = ({
  categoryslug,
  domain1,
  domain2,
  currentPosts,
  totalPosts,
  maxPost,
}) => {

  const [btnLoading, setbtnLoading] = useState<any>(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>();
  const [post, setPost] = useState<any>(currentPosts);
  const [snackMsg, setsnackMsg] = useState<any>("");
  const [snackDuration, setsnackDuration] = useState<any>();
  const [snackStatus, setsnackStatus] = useState<any>(false);
  
  useEffect(() => { 
    postsLoc = currentPosts;
    setLoading(false);
  }, [])

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setsnackStatus(false);
  };

  const snackAction = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        
        <XMarkIcon className={`w-5 h-5`} />
      </IconButton>
    </>
  );

  const fetchNxtPost = async () => {
    setbtnLoading(true);
    console.log(inPage)
    console.log(fnPage)

    const { data, error } = await supabaseClient
    .from('posts')
    .select('*, category!inner(*), authors!inner(*)')
    .eq('authors.username', domain1)
    .eq('authors.cus_domain', domain2)
    .eq('category.title', categoryslug)
    .range(inPage, fnPage);

    if(error) {
        setsnackMsg(error.message);
        throw setsnackStatus(true);
    }

    if(data.length > 0) {
        console.log(data);
        postsLoc = [...postsLoc, ...data];
        console.log(postsLoc);
        setPost(postsLoc);
        setbtnLoading(false);
        inPage = inPage + 11;
        fnPage = fnPage + 11;
    }else {
        setbtnLoading(false);
        setsnackMsg("No Posts to show");
        setsnackStatus(true);
    }   
  }

  return (
    
    <div className="container pt-5 pb-16 lg:pb-20 lg:pt-10 space-y-16 lg:space-y-28">
        <div>
            {
                (loading) ? <Loading/>
                : (
                    <>
                    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-8 ">
                        {post.map((post:any) => (
                            <SubCard11 key={post.id} post={post} badge={false} />
                        ))}
                    </div>

                    {
                        (totalPosts > maxPost) && (
                            
                            <div className="flex mt-20 justify-center items-center">
                              <ButtonPrimary loading={btnLoading} onClick={fetchNxtPost}>Show me more</ButtonPrimary>
                            </div>
                        ) 
                    }
                    </>
                )
            }
        </div>
        <Snackbar
            open={snackStatus}
            autoHideDuration={snackDuration}
            onClose={handleClose}
            action={snackAction}
            message={snackMsg}
        />
    </div>
  );
};

export default SectionCategoryPosts;
