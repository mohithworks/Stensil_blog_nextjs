"use client";

import React, { FC, useState } from "react";
import Heading from "@/components/Heading/Heading";
import SubArchiveFilterListBox from "@/components/ArchiveFilterListBox/SubArchiveFilterListBox";
import SubCard11 from "@/components/Card11/SubCard11";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Error from "@/components/Error/Error";
import Loading from "@/components/Loading/Loading";

export interface SectionArticlesProps {
  filterShow?: boolean;
  categories?: any;
  catLoading?: boolean;
  categoryListL?: string;
  fetchCatPost?:(e: any) => void;
  error: any;
  loading: any;
  currentPosts: any;
  postsLoc: number;
  maxPost: number;
  btnLoading: boolean;
  setPosts: () => void;
}
const SectionArticles: FC<SectionArticlesProps> = ({
  filterShow = true,
  categories,
  catLoading = true,
  categoryListL = "All",
  fetchCatPost,
  error,
  loading,
  currentPosts,
  postsLoc,
  maxPost,
  btnLoading,
  setPosts,
}) => {
  console.log(postsLoc + " " + maxPost)

  return (
    
    <div className="w-full pt-10 pb-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
        <div>
            {
                (filterShow && categories && categoryListL && fetchCatPost) && <div className={`flex flex-col sm:justify-between sm:flex-row ${categories.length != 0 ? `mb-8` : `-mb-1`} md:-mb-3 lg:-mb-3`}>
                  <Heading desc={""}>Articles</Heading>
                  {
                      categories.length != 0 && catLoading == false && <div className="flex justify-start -mt-2">
                      <SubArchiveFilterListBox lists={categories} selected={categoryListL} setSelected={fetchCatPost} />
                      </div>
                  }
                </div>
            }
            
            {
                (error) ? <Error/>
                : (loading) ? <Loading/>
                : (
                    <>
                    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-8 ">
                        {currentPosts.map((post:any) => (
                            <SubCard11 key={post.id} post={post} />
                        ))}
                    </div>

                    {
                          (postsLoc > maxPost) && (
                            
                            <div className="flex mt-20 justify-center items-center">
                              <ButtonPrimary loading={btnLoading} onClick={setPosts}>Show me more</ButtonPrimary>
                            </div>
                          ) 
                    }
                    </>
                )
            }
        </div>
    </div>
  );
};

export default SectionArticles;
