// app/sitemap.ts

import { fetchAllPosts, fetchAllCategories } from '@/utils/fetchContent';
import getAuthorSlugv2 from "@/utils/getAuthorSlugv2";
import { headers } from 'next/headers';

export default async function sitemap() {
  const { domain1, domain2 } = getAuthorSlugv2();

  const URL = headers().get('host');

  console.log('URL', URL)

  const allPosts = await fetchAllPosts(domain1, domain2);
  const allCategories = await fetchAllCategories(domain1, domain2);

  const posts:any = allPosts.data?.map((post:any) => ({
    url: `${URL}${post.href}`,
    lastModified: post.created_at,
  }));

  const categories:any = allCategories.data?.map((cat:any) => ({
    url: `${URL}${cat.href}`,
    lastModified: cat.created_at,
  }));

  const routes = ["", "/posts", "/category"].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes];
}
