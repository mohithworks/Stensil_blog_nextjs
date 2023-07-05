import React from "react";
import NcImage from "@/components/NcImage/NcImage";
import SingleHeader from "@/app/(singles)/SingleHeader";
import SubSingleHeader from "@/app/(posts)/SubSingleHeader";
import supabaseClient from "@/utils/supabaseClient";
import getAuthorSlugv2 from "@/utils/getAuthorSlugv2";
import SubSingleContent from "@/app/(posts)/SubSingleContent";
import SubSingleRelatedPosts from "@/app/(posts)/SubSingleRelatedPosts";
import Error from "@/components/Error/Error";
import NotFound from "@/components/NotFound/NotFound";
import { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

const returnFun = (error: any, posts: any) => { 
  return { errors: error, post: posts };
}

const fetchPost = async (postslug: string, domain1: string, domain2: string) => {

  const { data, error } = await supabaseClient
    .from('posts')
    .select(`*, authors!inner(*), category!inner(*), refauthors!inner(*)`)
    .eq('posttitle', postslug)
    .eq('authors.username', domain1)
    .eq('authors.cus_domain', domain2)

    if(error) {
      return returnFun("Please check your internet connection & refresh the page", null);
    }

    if(data) {
      return returnFun(null, data);
    } else {
      return returnFun("Please check your internet connection & refresh the page", null);
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { domain1, domain2 } = getAuthorSlugv2();

  const { errors, post } = await fetchPost(params.slug, domain1, domain2);

  if(errors) {
    return {
      title: 'Typeflo',
      description: '',
      keywords: 'Typeflo Blog typeflo',
    };
    
  }else if(post.length == 0) { 
    return {
      title: 'Typeflo',
      description: '',
      keywords: 'Typeflo Blog typeflo',
    };

  }
  return {
    title: post[0].metatitle + ' | ' + post[0].authors.metatitle,
    description: post[0].metadescription,
    keywords: post[0].title + ' ' + post[0].category.name + ' ' + post[0].authors.metatitle,
  };
}

const PageSingle = async ({ params }: { params: { slug: string } }) => {
  console.log(params.slug)
  const { domain1, domain2 } = getAuthorSlugv2();
  
  const postData = await fetchPost(params.slug[0], domain1, domain2);
  console.log(postData);

  // if(postData.errors) {
  //   return <Error textSizeSH={'text-2xl'} />
  // }
  // if(postData.post.length == 0) {
  //   return <NotFound />;
  // }
  return (
    <>
      <div className={`nc-PageSingle bg-white pt-8 lg:pt-16`}>
        <header className="container rounded-xl">
          <div className="max-w-screen-md mx-auto">
            <SubSingleHeader postData={postData.post} />
          </div>
        </header>

        {/* FEATURED IMAGE */}
        <NcImage
          alt="single"
          containerClassName="container my-10 sm:my-12"
          className="w-full rounded-xl"
          src={postData.post[0].featured_imghd}
          width={1260}
          height={750}
          sizes="(max-width: 1024px) 100vw, 1280px"
        />

        {/* SINGLE MAIN CONTENT */}
        <div className="container mt-10">
          <SubSingleContent data={postData.post[0].post} />
        </div>
  
        {/* RELATED POSTS */}
        <SubSingleRelatedPosts type={postData.post[0].refauthors.id === '153de11c-9ce8-4d79-9d19-c10da778e84c' ? 'authors': 'refauthors'} category={postData.post[0].category.id} postTitle={postData.post[0].posttitle} domain1={postData.post[0].refauthors.id === '153de11c-9ce8-4d79-9d19-c10da778e84c' ? domain1 : postData.post[0].refauthors.id} domain2={domain2} />
      </div>
    </>
  );
};

export default PageSingle;
