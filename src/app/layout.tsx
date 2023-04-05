import "./globals.css";
import "@/styles/index.scss";
import { Poppins } from "next/font/google";
import MusicPlayer from "@/components/MusicPlayer/MusicPlayer";
import Footer from "@/components/Footer/Footer";
import SiteHeader from "./SiteHeader";
import supabaseClient from "@/utils/supabaseClient";
import getAuthorSlugv2 from "@/utils/getAuthorSlugv2";
import GlobalContextProvider from "@/context/GlobalContextProvider";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});


const supabaseFetchMultipleEq = async (table: string, query: string, type: string, authorSlug: string, type2: string, authorSlug2: string) => {
  const { data, error } = await supabaseClient.from(table).select(query).eq(type, authorSlug).eq(type2, authorSlug2);

  return { error, data };
};

const returnFun = (error: any, posts: any, authors: any, currentPost: any, domain1: string, domain2: string) => { 
  return { errors: error, post: posts, author: authors, currentpost: currentPost, domain1: domain1, domain2: domain2 };
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

  if (posts.error) {

    return returnFun("Please check your internet connection & refresh the page", null, [], null, domain1, domain2);

  }else if (posts.data.length == 0) {
    var authors:any = await supabaseFetchMultipleEq("authors", "*", "username", domain1, 'cus_domain', domain2);

    if (authors.error) {
      return returnFun("Please check your internet connection & refresh the page", null, [], null,domain1, domain2);
    }
    
    return returnFun(null, null, authors.data, null, domain1, domain2);

  } else {

    return returnFun(null, posts.data, [posts.data[0].authors], posts.data[0], domain1, domain2);

  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const userData = await fetchAuthor();

  return (
    <html lang="en" className={poppins.className}>
      <body className="bg-[#f8f8f8] text-base dark:bg-neutral-900/95 text-neutral-900 dark:text-neutral-200">
        <GlobalContextProvider data={userData}>
          <SiteHeader />
          {children}
          <MusicPlayer />
          <Footer />
        </GlobalContextProvider>
      </body>
    </html>
  );
}
