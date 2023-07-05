import React, { FC } from "react";
import { DEMO_POSTS } from "@/data/posts";
import { PostDataType } from "@/data/types";
import supabaseClient from "@/utils/supabaseClient";
import getAuthorSlugv2 from "@/utils/getAuthorSlugv2";
import Error from "@/components/Error/Error";
import NotFound from "@/components/NotFound/NotFound";
import dynamic from 'next/dynamic';
import { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

const SectionCategoryPosts = dynamic(() => import('@/app/(category)/SectionCategoryPosts'), {
  ssr: false,
})
// Tag and category have same data type - we will use one demo data
const posts: PostDataType[] = DEMO_POSTS.filter((_, i) => i < 16);

const returnFun = (error: any, posts: any, category: any, author: any) => { 
  return { errors: error, post: posts, category: category, author: author };
}

var inPage:any = 0, fnPage:any = 10, maxPost: any = 11;

const supabaseFetch = async (categoryslug: string, domain1: string, domain2: string): Promise<any> => { 
    
  const { data, error } = await supabaseClient
    .from('posts')
    .select('*, category!inner(*), authors!inner(*)')
    .eq('authors.username', domain1)
    .eq('authors.cus_domain', domain2)
    .eq('category.title', categoryslug)
    .range(inPage, fnPage);

  return { data, error }; 
}

const supabaseFetchCat = async (categoryslug: string, domain1: string, domain2: string): Promise<any> => { 
  const { data, error } = await supabaseClient
  .from('category')
  .select(`*, authors!inner(*)`)
  .eq('title', categoryslug)
  .eq('authors.username', domain1)
  .eq('authors.cus_domain', domain2)

  return { data, error }; 
}

const fetchPost = async (categoryslug: string, domain1: string, domain2: string): Promise<any> => {
    inPage = 0; fnPage = 10;
    
    const { data, error } = await supabaseFetch(categoryslug, domain1, domain2);
    if(error) {
      return returnFun("Please check your internet connection & refresh the page", null, null, null);
    }

    if(data?.length == 0) {
      const categoryData =  await supabaseFetchCat(categoryslug, domain1, domain2);
      if(categoryData.error) {
        return returnFun("Please check your internet connection & refresh the page", null, null, null);
      }
      if(categoryData.data[0]) {
        return returnFun(null, null, categoryData.data[0], categoryData.data[0].authors);
      }
    }else if(data) {
      return returnFun(null, data, data[0].category, data[0].authors);
    }
    return returnFun(null, null, null, null);
}

const fetchMeta = async (categoryslug: string) => { 
  const { domain1, domain2 } = getAuthorSlugv2();
    var cat:any = await supabaseFetchCat(categoryslug, domain1, domain2);

    if (cat.error) {
      return { error: true, data: null };
    }
    return { error: false, data: cat.data };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

  const { error, data } = await fetchMeta(params.slug);

  if(error) {
    return {
      title: 'Typeflo',
      description: '',
      keywords: 'Typeflo Blog typeflo',
    };
    
  }else if(data.length == 0) { 
    return {
      title: 'Typeflo',
      description: '',
      keywords: 'Typeflo Blog typeflo',
    };

  }
  return {
    title: data[0].name + ' | ' + data[0].authors.metatitle,
    description: data[0].metadescription,
    keywords: data[0].name + ' ' + data[0].title + ' ' + data[0].authors.metatitle,
  };
}

const PageArchive = async ({ params }: { params: { slug: string } }) => {
  const FILTERS = [
    { name: "Most Recent" },
    { name: "Curated by Admin" },
    { name: "Most Appreciated" },
    { name: "Most Discussed" },
    { name: "Most Viewed" },
  ];

  console.log(params.slug)
  const { domain1, domain2 } = getAuthorSlugv2();
  
  const postData = await fetchPost(params.slug[0], domain1, domain2);
  console.log(postData);

  if(postData.errors) {
    return <Error textSizeSH={'text-2xl'} />
  }
  if(!postData.category) {
    return <NotFound />;
  }
  return (
    <div className={`nc-PageArchive flex-1`}>
      {/* HEADER */}
      <div className="w-full px-2 xl:max-w-screen-2xl mx-auto">
        <div className="relative aspect-w-16 aspect-h-13 sm:aspect-h-9 lg:aspect-h-8 xl:aspect-h-5 overflow-hidden z-0">
          <div className="object-cover w-full h-full"></div>
          <div className="flex flex-col items-center justify-center">
            <h2 className="inline-block align-middle text-3xl font-semibold md:text-7xl ">
              {postData.category.name}
            </h2>
            {
              postData.category.id !== "255d4855-644e-43ab-829b-16adc417df97" && <span className="block mt-4 text-2xl">{postData.category.posts} {postData.category.posts > 1 ? 'Posts' : 'Post'}</span>
            }
          </div>
        </div>
      </div>
      {/* ====================== END HEADER ====================== */}

      <div className="-mt-50">
        <div>

          {postData.post != null && <SectionCategoryPosts
            categoryslug={params.slug[0]}
            domain1={domain1}
            domain2={domain2}
            currentPosts={postData.post}
            totalPosts={postData.category.id !== "255d4855-644e-43ab-829b-16adc417df97" ? postData.category.posts : postData.author.posts}
            maxPost={maxPost}
          />}
        </div>
      </div>
    </div>
  );
};

export default PageArchive;
