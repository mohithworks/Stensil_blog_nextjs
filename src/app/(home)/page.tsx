"use client";

import React, {useState, useEffect, Fragment} from "react";
import SectionLargeSlider from "@/app/(home)/SectionLargeSlider";
import TitleHeading from "@/components/Heading/TitleHeading";
import Error from "@/components/Error/Error";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionSliderNewAuthors from "@/components/SectionSliderNewAthors/SectionSliderNewAuthors";
import SectionSliderNewCategories from "@/components/SectionSliderNewCategories/SectionSliderNewCategories";
import { DEMO_CATEGORIES } from "@/data/taxonomies";
import { DEMO_AUTHORS } from "@/data/authors";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import Heading from "@/components/Heading/Heading";
import Snackbar from '@mui/material/Snackbar';
import {
  DEMO_POSTS,
  DEMO_POSTS_AUDIO,
  DEMO_POSTS_GALLERY,
  DEMO_POSTS_VIDEO,
} from "@/data/posts";
import ButtonDropdown from "@/components/ButtonDropdown/ButtonDropdown";
import Loading from "@/components/Loading/Loading";
import Button from "@/components/Button/Button";
import SectionMagazine1 from "@/components/Sections/SectionMagazine1";
import SectionAds from "@/components/Sections/SectionAds";
import SectionMagazine7 from "@/components/Sections/SectionMagazine7";
import SectionGridPosts from "@/components/Sections/SectionGridPosts";
import SectionMagazine8 from "@/components/Sections/SectionMagazine8";
import SectionMagazine9 from "@/components/Sections/SectionMagazine9";
import SectionGridAuthorBox from "@/components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionBecomeAnAuthor from "@/components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import SectionSubscribe3 from "@/components/SectionSubscribe3/SectionSubscribe3";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import SubCard11 from "@/components/Card11/SubCard11";
import Card11 from "@/components/Card11/Card11";
import SubCard2 from "@/components/Card2/SubCard2";
import supabaseClient from "@/utils/supabaseClient";
import { useGlobalContext } from "@/context/GlobalContextProvider";
import IconButton from '@mui/material/IconButton';
import { PostDataType } from "@/data/types";
import SubArchiveFilterListBox from "@/components/ArchiveFilterListBox/SubArchiveFilterListBox";
import dynamic from 'next/dynamic';

//
const MAGAZINE1_POSTS = DEMO_POSTS.filter((_, i) => i >= 8 && i < 16);
const MAGAZINE2_POSTS = DEMO_POSTS.filter((_, i) => i >= 0 && i < 7);
//
const postsT: PostDataType[] = DEMO_POSTS.filter((_, i) => i < 16);

var inPage:any = 0, fnPage:any = 10, postsLoc:any = [], icPage:any = 0, fcPage:any = 0, catVal: any = "-1", maxPost: any = 11, hostname:any;

const SectionArticles = dynamic(() => import('@/app/(home)/SectionsArticles'), {
  ssr: false,
})

const PageHome = (props: any) => {

  const { errors, post, author, domain1, domain2 } = useGlobalContext();

  const [btnLoading, setbtnLoading] = useState<any>(false);
  const [loading, setLoading] = useState<any>(false);
  const [error, setError] = useState<any>();
  const [catLoading, setcatLoading] = useState<any>(true);
  const [catError, setcatError] = useState<any>();
  const [snackMsg, setsnackMsg] = useState<any>("");
  const [snackDuration, setsnackDuration] = useState<any>();
  const [snackStatus, setsnackStatus] = useState<any>(false);
  const [categories, setCategories] = useState<any>([]);
  
  const [categoryList, setcategoryList] = useState<any>(catVal);
  const [categoryListL, setcategoryListL] = useState<any>("All");

  const [currentPosts, setcurrentPosts] = useState<any>(postsLoc);

  if(currentPosts?.length == 0){
    postsLoc = post;
    inPage = postsLoc?.length;
    fnPage = postsLoc?.length + maxPost;
    setcurrentPosts(postsLoc);
  }

  if (typeof window !== 'undefined') {
      hostname = window.location.hostname;
      console.log("hostname", hostname)
      console.log("domain1", domain1)
      console.log("domain2", domain2)
  }

  useEffect(() => {
    const fetchCat = async() => {
      // var posts:any = await supabaseFetch('posts', 'title, created_at, featured_imghd, href, authors!inner(*), category!inner(*)', 'authors.username');
      const {data, error} = await supabaseClient
      .from('category')
      .select('*, authors!inner(*)')
      .eq('authors.username', domain1)
      .eq('authors.cus_domain', domain2)
      .order('created_at', {ascending: false})
      .gt('posts', 0);

      if(error) {
        throw setcatError(error.message);
      }

      if(data) {
        console.log("Inside cat");
        setCategories(data);
        setcatLoading(false);
      }
    }
    fetchCat()
  }, []);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setsnackStatus(false);
  };

  const FILTERS = [
    { name: "Most Recent" },
    { name: "Curated by Admin" },
    { name: "Most Appreciated" },
    { name: "Most Discussed" },
    { name: "Most Viewed" },
  ];

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

  const posts = post?.sort((a:any, b:any) => {
    return b.created_at - a.created_at;
  }).slice(0, 3);

  // var initRange:any = parseInt(localStorage.getItem('initpostRange')!);
  // var finRange:any = parseInt(localStorage.getItem('finpostRange')!);
  
  const fetchNxtPost = async () => {

    const {data,error} = await supabaseClient
      .from('posts')
      .select('title, created_at, featured_imghd, href, post, authors!inner(*), category!inner(*)')
      .eq('authors.username', domain1)
      .eq('authors.cus_domain', domain2)
      .range(inPage, fnPage)
      .order("created_at", { ascending: false });

      if(error) {
        setsnackMsg(error.message);
        throw setsnackStatus(true);
      }

      if(data.length > 0) {
        console.log(data);
        postsLoc = [...postsLoc, ...data];
        inPage = postsLoc.length;
        fnPage = postsLoc.length + maxPost;
        
        console.log(inPage);
        console.log(fnPage);
    
        // localStorage.setItem('postsLoc', JSON.stringify(newPosts));
        // localStorage.setItem('initpostRange', iPage);
        // localStorage.setItem('finpostRange', fPage);

        // var npostsLoc:any = JSON.parse(localStorage.getItem('postsLoc')!);
        console.log(postsLoc);
        setcurrentPosts(postsLoc);
        setbtnLoading(false);

      }else {
        setbtnLoading(false);
        setsnackMsg("No Posts to show");
        setsnackStatus(true);

      }

  }

  const fetchNewCat = async (catId:any) => {
    
    const {data,error} = await supabaseClient
      .from('posts')
      .select('title, created_at, featured_imghd, href, post, authors!inner(*), category!inner(*)')
      .eq('authors.username', domain1)
      .eq('authors.cus_domain', domain2)
      .eq('category', catId)
      .range(icPage, fcPage);

      if(error) {
        throw setError(error.message);
      }

      if(data.length > 0) {
        console.log(data);
        postsLoc = [...postsLoc, ...data];
        icPage = postsLoc.length;
        fcPage = postsLoc.length + maxPost;
        
        console.log(icPage);
        console.log(fcPage);

        setcurrentPosts(postsLoc);
        setLoading(false);

      }else {
        setLoading(false);
        setsnackMsg("No Posts to show");
        setsnackStatus(true);

      }
  }

  const fetchCatPost = async (catId:any) => {
    setLoading(true);
    catVal = catId.id;
    setcategoryListL(catId.name);
    setcategoryList(catId.id);
    if(catVal == "-1") {
      postsLoc = [];
      inPage = postsLoc.length;
      fnPage = postsLoc.length + maxPost;
      fetchNxtPost().then(() => {
        setLoading(false);
      });
    }else {
      postsLoc = [];
      icPage = postsLoc.length;
      fcPage = postsLoc.length + maxPost;
      fetchNewCat(catVal).then(() => {
        setLoading(false);
      });

    }

  }

  const setPosts = (catId:any) => {
    console.log(categoryList);
    setbtnLoading(true);
    if(catId == "-1") {
      fetchNxtPost();
    }else {
      fetchNewCat(catId).then(() => {
        setbtnLoading(false);
      });
    }
  }

  const href = (post: any) => { return post.href; }

  return (
    <>
    <div className="nc-PageHome relative overflow-x-hidden bg-white dark:bg-slate-800">
      <div className="container relative">
        <SectionLargeSlider
          className="pt-10 pb-16 md:py-16 lg:pb-28 lg:pt-20"
          heading={author[0].title}
          desc={author[0].description}
          posts={posts}
        />

        {post != null && <SectionArticles
          categories={categories}
          catLoading={catLoading}
          categoryListL={categoryListL}
          fetchCatPost={(e:any) => fetchCatPost(e)}
          error={error}
          loading={loading}
          currentPosts={currentPosts}
          postsLoc={author[0].posts}
          maxPost={maxPost}
          btnLoading={btnLoading}
          setPosts={() => setPosts(categoryList)}
        />}

        <div className="relative">
          <BackgroundSection />
          <SectionSubscribe3 className="pt-16 pb-10 lg:pt-28" />
        </div>

        <Snackbar
          open={snackStatus}
          autoHideDuration={snackDuration}
          onClose={handleClose}
          action={snackAction}
          message={snackMsg}
        />
      </div>
    </div>
    </>
  );
};

export default PageHome;
