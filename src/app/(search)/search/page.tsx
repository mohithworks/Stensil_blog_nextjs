import React, { FC, useState } from "react";
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
import SectionSliderNewAuthors from "@/components/SectionSliderNewAthors/SectionSliderNewAuthors";
import ButtonSecondary from "@/components/Button/ButtonSecondary";
import SectionGridCategoryBox from "@/components/SectionGridCategoryBox/SectionGridCategoryBox";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import Card11 from "@/components/Card11/Card11";
import CardCategory2 from "@/components/CardCategory2/CardCategory2";
import Tag from "@/components/Tag/Tag";
import Error from "@/components/Error/Error";
import supabaseClient from "@/utils/supabaseClient";
import getAuthorSlugv2 from "@/utils/getAuthorSlugv2";
import dynamic from 'next/dynamic';

const SearchContent = dynamic(() => import('@/app/(search)/SearchContent'), {
  ssr: false,
})

const returnPost = (error: any, posts: any, postLen: any) => { 
  return { errors: error, post: posts, postLen: postLen };
}

const returnCat = (error: any, category: any, catLen: any) => { 
  return { errors: error, category: category, catLen: catLen };
}

export const metadata = {
  title: 'Search'
}

const supabaseSearch = async (table: any, content: any, column: any, domain1: string, domain2: string, search: string) => {
  const { data, error } = await supabaseClient
    .from(table)
    .select(content)
    .eq('authors.username', domain1)
    .eq('authors.cus_domain', domain2)
    .textSearch(column, `'${search}'`)

    return { data, error }
} 

const fetchPost = async (domain1: string, domain2: string, search: string) => {
    const { data, error } = await supabaseSearch('posts', `id, title, featured_imghd, href, created_at, authors!inner(*)`, 'posttitle', domain1, domain2, search);

    if(error) {
      return returnPost("Please check your internet connection & refresh the page", null, null);
    }

    if (data) {
      return returnPost(null, data, data.length);
    }
    return returnPost(null, null, null);
}

const fetchCat = async (domain1: string, domain2: string, search: string) => {
    console.log(search)
    const { data, error } = await supabaseSearch('category', `*, authors!inner(*)`, 'title', domain1, domain2, search);

    if(error) {
      return returnCat("Please check your internet connection & refresh the page", null, null);
    }

    if (data) {
      return returnCat(null, data, data.length);
    }
    return returnCat(null, null, null);
}

const PageSearch = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  let s = "Technology";

  const { domain1, domain2 } = getAuthorSlugv2();

  const search = searchParams.q;

  const postsData = await fetchPost(domain1, domain2, search);
  const catData = await fetchCat(domain1, domain2, search);
  console.log(postsData)
  console.log(catData)

  // if(postsData.errors || catData.errors) { 
  //   return <Error textSizeSH={'text-4xl'} />
  // }
  return (
    <div className={`nc-PageSearchV2`}>
      <div className="w-full px-2 xl:max-w-screen-2xl mx-auto px-30">
        <div className="relative aspect-w-16 aspect-h-13 sm:aspect-h-9 lg:aspect-h-8 xl:aspect-h-5 overflow-hidden z-0">
          <div className="object-cover w-full h-full bg-primary-100/50 dark:bg-neutral-900"></div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-center mt-4 text-2xl lg:text-3xl md:text-3xl">We found{" "}
              <strong className="font-semibold text-neutral-800 dark:text-neutral-100">
                {postsData.postLen}
              </strong>{" "}
              {postsData.postLen > 1 ? 'posts' : 'post'} and {" "}
              <strong className="font-semibold text-neutral-800 dark:text-neutral-100">
                {catData.catLen}
              </strong>{" "}
              {catData.catLen > 1 ? 'categories' : 'category'} for{" "}
              <strong className="font-semibold text-neutral-800 dark:text-neutral-100">
                {`"${search}"`}
              </strong></span>
          </div>
        </div>
      </div>
      <SearchContent search={search} postsData={postsData} catData={catData} />
    </div>
  );
};

export default PageSearch;
