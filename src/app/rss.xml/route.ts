import Rss from "rss";

import { fetchAuthor, fetchAllPosts, fetchAllCategories } from '@/utils/fetchContent';
import getAuthorSlugv2 from "@/utils/getAuthorSlugv2";
import { headers } from 'next/headers';

export async function GET() {
    const protocol = process.env.NEXT_SITE_NAME === 'localhost:3000' ? 'http://' : 'https://';
    const SITE_URL = protocol + headers().get('host');

    const { domain1, domain2 } = getAuthorSlugv2();

    const author:any = await fetchAuthor(domain1, domain2);
    const posts:any = await fetchAllPosts(domain1, domain2);
    const category:any = await fetchAllCategories(domain1, domain2);

    const feed = new Rss({
        title: author.data[0].metatitle,
        description: author.data[0].metadescription,
        feed_url: `${SITE_URL}/rss.xml`,
        site_url: SITE_URL,
        language: "en",
        custom_namespaces: {
          'media': SITE_URL
        },
    });

    posts.data.forEach((post:any) => {
        feed.item({
            title: post.title,
            description: post.excerpt === null ? "" : post.excerpt,
            url: `${SITE_URL}${post.href}`,
            guid: post.id,
            custom_elements: [
                {'media:image': {
                  _attr: {
                    url: post.featured_imgsd,
                    medium: 'image',
                  }
                }},
              ],
            categories: [post.category.name],
            date: post.created_at,
        });
    });

    category.data.forEach((cat:any) => {
        feed.item({
            title: cat.name,
            description: cat.metadescription === null ? "" : cat.metadescription,
            url: `${SITE_URL}${cat.href}`,
            guid: cat.id,
            date: cat.created_at,
        });
    });

    return new Response(feed.xml(), {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
