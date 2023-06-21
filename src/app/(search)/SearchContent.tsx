"use client";

import React, { FC, useState, useEffect } from "react";
import { DEMO_POSTS } from "@/data/posts";
import { PostDataType } from "@/data/types";
import { DEMO_AUTHORS } from "@/data/authors";
import { DEMO_CATEGORIES } from "@/data/taxonomies";
import Pagination from "@/components/Pagination/Pagination";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Nav from "@/components/Nav/Nav";
import NavItem from "@/components/NavItem/NavItem";
import ArchiveFilterListBox from "@/components/ArchiveFilterListBox/ArchiveFilterListBox";
import Input from "@/components/Input/Input";
import SectionSubscribe2 from "@/components/SectionSubscribe2/SectionSubscribe2";
import NcLink from "@/components/NcLink/NcLink";
import SectionSliderNewAuthors from "@/components/SectionSliderNewAthors/SectionSliderNewAuthors";
import ButtonSecondary from "@/components/Button/ButtonSecondary";
import SectionGridCategoryBox from "@/components/SectionGridCategoryBox/SectionGridCategoryBox";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SubCard11 from "@/components/Card11/SubCard11";
import ButtonCircle from "@/components/Button/ButtonCircle";
import SubCardCategory2 from "@/components/CardCategory2/SubCardCategory2";
import Tag from "@/components/Tag/Tag";
import CardAuthorBox2 from "@/components/CardAuthorBox2/CardAuthorBox2";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useGlobalContext } from "@/context/GlobalContextProvider"; 
import supabaseClient from "@/utils/supabaseClient";
import { useSearchParams } from 'next/navigation'

const TABS = ["Posts", "Categories"];

export interface SearchContentProps {
    search: string | string[];
    postsData: any;
    catData: any;
}

const SearchContent: FC<SearchContentProps> = ({
    search,
    postsData,
    catData,
}) => {

  const { errors, post, author, domain1, domain2 } = useGlobalContext();
  
  const [tabActive, setTabActive] = useState(TABS[0]);
  const [loading, setLoading] = useState(true);

  const handleClickTab = (item: string) => {
    if (item === tabActive) {
      return;
    }
    setTabActive(item);
  };

  const supabaseSearch = async (table: any, content: any, column: any) => {
    const { data, error } = await supabaseClient
      .from(table)
      .select(content)
      .eq('authors.username', domain1)
      .eq('authors.cus_domain', domain2)
      .textSearch(column, `'${search}'`)
  
      return { data, error }
  } 

  useEffect(() => {
    setLoading(true);
    if(postsData.postLen > 0) {
        setTabActive(TABS[0]);
    } else {
        setTabActive(TABS[1]);
    }
    setLoading(false);
  }, [])

  if((postsData.postLen > 0 || catData.catLen > 0) && loading === false) {
        return (
            <div className={`nc-PageSearch`}>
            <div className="container py-16 lg:pb-28 lg:pt-10 space-y-16 lg:space-y-28">
                <main>
                {/* TABS FILTER */}
                <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row">
                    <Nav
                    containerClassName="w-full overflow-x-auto hiddenScrollbar"
                    className="sm:space-x-2"
                    >
                    {postsData.postLen > 0 && catData.catLen > 0 && TABS.map((item, index) => (
                        <NavItem
                            isActive={item === tabActive}
                            key={index}
                            onClick={() => handleClickTab(item)}
                        >
                        {item}
                        </NavItem>
                    ))}
                    </Nav>
                </div>

                {/* LOOP ITEMS */}
                {/* LOOP ITEMS POSTS */}
                {tabActive === "Posts" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8 mt-8 lg:mt-10">
                    {postsData.post.map((post:any) => (
                        <SubCard11 key={post.id} post={post} badge={false} postTextShow={false} />
                    ))}
                    </div>
                )}
                {/* LOOP ITEMS CATEGORIES */}
                {tabActive === "Categories" && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-8 mt-8 lg:mt-10">
                    {catData.category.map((cat:any) => (
                        <SubCardCategory2 key={cat.id} taxonomy={cat} />
                    ))}
                    </div>
                )}

                {/* PAGINATION */}
                {/* <div className="flex mt-20 justify-center items-center">
                    <ButtonPrimary loading={btnLoading}>Show me more</ButtonPrimary>
                </div> */}
                </main>

            </div>
            </div>
        );
    } else {
        return null;
    }
};

export default SearchContent;
