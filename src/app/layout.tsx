import "./globals.css";
import "@/styles/index.scss";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import { Poppins } from "next/font/google";
import MusicPlayer from "@/components/MusicPlayer/MusicPlayer";
import SubFooter from "@/components/Footer/SubFooter";
import SiteHeader from "./SiteHeader";
import supabaseClient from "@/utils/supabaseClient";
import getAuthorSlugv2 from "@/utils/getAuthorSlugv2";
import GlobalContextProvider from "@/context/GlobalContextProvider";
import Error from "@/components/Error/Error";
import NotFound from "@/components/NotFound/NotFound";
import { Metadata } from 'next';

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});


const supabaseFetchMultipleEq = async (table: string, query: string, type: string, authorSlug: string, type2: string, authorSlug2: string) => {
  const { data, error } = await supabaseClient.from(table).select(query).eq(type, authorSlug).eq(type2, authorSlug2);

  return { error, data };
};

const returnFun = (error: any, posts: any, authors: any, nav: any, currentPost: any, domain1: string, domain2: string) => { 
  return { errors: error, post: posts, author: authors, nav: nav, currentpost: currentPost, domain1: domain1, domain2: domain2 };
}

const fetchAuthor = async () => { 
  const { domain1, domain2 } = getAuthorSlugv2();

  var posts:any = await supabaseClient
  .from("posts")
  .select(
    "*, authors!inner(*), category!inner(*), refauthors!inner(*)",
  )
  .eq("authors.username", domain1)
  .eq("authors.cus_domain", domain2)
  .range(0, 10)
  .order("created_at", { ascending: false });

  var nav:any = await supabaseFetchMultipleEq("navigationv2", "*, authors!inner(*)", "authors.username", domain1, 'authors.cus_domain', domain2);

  if (posts.error || nav.error) {

    return returnFun("Please check your internet connection & refresh the page", null, [], null, null, domain1, domain2);

  }else if (posts.data.length == 0) {
    var authors:any = await supabaseFetchMultipleEq("authors", "*", "username", domain1, 'cus_domain', domain2);

    if (authors.error) {
      return returnFun("Please check your internet connection & refresh the page", null, [], null, null, domain1, domain2);
    }
    console.log(authors)
    return returnFun(null, null, authors.data, nav.data, null, domain1, domain2);

  } else {

    return returnFun(null, posts.data, [posts.data[0].authors], nav.data, posts.data[0], domain1, domain2);

  }
}

const fetchMeta = async () => { 
  const { domain1, domain2 } = getAuthorSlugv2();
    var authors:any = await supabaseFetchMultipleEq("authors", "metatitle, description, title", "username", domain1, 'cus_domain', domain2);

    if (authors.error) {
      return { error: true, data: null };
    }
    console.log(authors)
    return { error: false, data: authors.data };
}

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {

  const { error, data } = await fetchMeta();

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
    title: data[0].metatitle,
    description:  data[0].description,
    keywords: data[0].title + ' ' + data[0].metatitle + ' ' + data[0].description,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const userData = await fetchAuthor();

  const { errors, author, nav } = userData;

  // if(errors) {
  //   return <Error textSizeSH={'text-2xl'} />
  // } else if(author.length == 0) { 
  //   return <NotFound />
  // }
  return (
    <html lang="en" className={poppins.className}>
      <body suppressHydrationWarning={true} className="bg-[#f8f8f8] text-base dark:bg-neutral-900/95 text-neutral-900 dark:text-neutral-200">
        <GlobalContextProvider data={userData}>
          <SiteHeader />
          {children}
          <MusicPlayer />
          <SubFooter authors={[{
            logoimg: author[0].logoimg,
            metatitle: author[0].metatitle,
            logoimgdark: author[0].logoimgdark,
            darkmode: author[0].darkmode,
          }]} menus={nav} />
        </GlobalContextProvider>
      </body>
    </html>
  );
}
