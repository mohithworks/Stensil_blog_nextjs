// app/sitemap.xml/route.js
 
import { fetchAllPosts, fetchAllCategories } from '@/utils/fetchContent';
import getAuthorSlugv2 from "@/utils/getAuthorSlugv2";
import { headers } from 'next/headers';
 
function generateSiteMap(URL: any, posts:any, category: any) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>${URL}</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
     </url>
     <url>
       <loc>${URL}/posts</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
     </url>
      <url>
       <loc>${URL}/category</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
     </url>
     ${posts.data.map((post:any) => {
         return `
           <url>
               <loc>${`${URL}${post.href}`}</loc>
               <lastmod>${new Date().toISOString()}</lastmod>
           </url>
         `;
       })
       .join("")}
    ${category.data.map((cat:any) => {
        return `
            <url>
                <loc>${`${URL}${cat.href}`}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
            </url>
        `;
        })
        .join("")}
   </urlset>
 `;
}
 
export async function GET() {
  const protocol = process.env.NEXT_SITE_NAME === 'localhost:3001' ? 'http://' : 'https://';
  const URL = protocol + headers().get('host');
  const { domain1, domain2 } = getAuthorSlugv2();
  
  const posts = await fetchAllPosts(domain1, domain2);
  const category = await fetchAllCategories(domain1, domain2);
  const body = generateSiteMap(URL, posts, category);
 
  return new Response(body, {
    status: 200,
    headers: {
      "Cache-control": "public, s-maxage=86400, stale-while-revalidate",
      "content-type": "application/xml",
    },
  });
}