"use client";

import React, { FC, useEffect, useState } from "react";
import Heading from "@/components/Heading/Heading";
import SubCard11 from "@/components/Card11/SubCard11";
import SubCard9 from "@/components/Card9/SubCard9";
import supabaseClient from "@/utils/supabaseClient";
import Error from "@/components/Error/Error";
import Loading from "@/components/Loading/Loading";

export interface SubSingleRelatedPostsProps {
    category: string;
    type?: string;
    postTitle: string;
    domain1: string;
    domain2: string;
}

const SubSingleRelatedPosts:FC<SubSingleRelatedPostsProps> = ({ category, type, postTitle, domain1, domain2 }) => {
   const [loading, setLoading] = useState<any>(true);
   const [error, setError] = useState<any>();
   const [relPosts, setrelPosts] = useState<any>();
   const [autPosts, setautPosts] = useState<any>();

   useEffect(() => {
        const fetchPost = async () => {
            
            var relposts:any = type === "authors" ? 
            await supabaseClient
            .from('posts')
            .select('*, authors!inner(*), category!inner(*)')
            .eq('authors.username', domain1)
            .eq('authors.cus_domain', domain2)
            .eq('category', category)
            .neq('posttitle', postTitle)
            .range(0, 3) : 
            await supabaseClient
            .from('posts')
            .select('*, authors!inner(*), category!inner(*), refauthors!inner(*)')
            .eq('refauthors.id', domain1)
            .eq('category', category)
            .neq('posttitle', postTitle)
            .range(0, 3);

            var autposts:any = type === "authors" ? 
            await supabaseClient
            .from('posts')
            .select('*, authors!inner(*), category!inner(*)')
            .eq('authors.username', domain1)
            .eq('authors.cus_domain', domain2)
            .neq('posttitle', postTitle)
            .neq('category', category)
            .range(0, 3)
            :
            await supabaseClient
            .from('posts')
            .select('*, authors!inner(*), category!inner(*), refauthors!inner(*)')
            .eq('refauthors.id', domain1)
            .neq('posttitle', postTitle)
            .neq('category', category)
            .range(0, 3);

            if(relposts.error || autposts.error) {
                console.log(relposts.error || autposts.error)
                throw setError(relposts.error.message || autposts.error.message);
            }

            if(relposts.data && autposts.data) {
                setrelPosts(relposts.data);
                setautPosts(autposts.data);
                console.log(relposts);
                console.log(autposts);
                setLoading(false);
            }
        }
        
        fetchPost()
        
  }, []);

  if(error) {

    return <div className="py-10">
        <Error />
      </div>;

  }else if(loading == true) {

    return <div className="py-10">
        <Loading size={20}/>
      </div>;

  }else if(relPosts.length == 0 &&  autPosts.length == 0) {

    return null;
  }  
  
  const href = (post: any) => { return post.href; }

  return (
    <div className="relative bg-neutral-100 dark:bg-neutral-800 lg:py-28 mt-16 lg:mt-28">
      {/* RELATED  */}
      <div className="container">
        {
            relPosts.length > 0 && <div>
            <Heading
              className="mb-10 text-neutral-900 dark:text-neutral-50"
              desc=""
            >
              Related posts
            </Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {relPosts.map((post: any) => (
                <SubCard11 key={post.id} post={post} />
              ))}
            </div>
          </div>
        }

        {/* MORE FROM AUTHOR */}
        {
            autPosts.length > 0 && <div className="mt-20">
              <Heading
                className="mb-10 text-neutral-900 dark:text-neutral-50"
                desc=""
              >
                More from author
              </Heading>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {autPosts.map((post: any) => (
                  <SubCard9 key={post.id} posts={post} postHref={'../'+'../'+href(post)} />
                ))}
              </div>
            </div>
        }
      </div>
    </div>
  );
};

export default SubSingleRelatedPosts;
