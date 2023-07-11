import supabaseClient from "@/utils/supabaseClient";

const supabaseFetchMultipleEq = async (table: string, query: string, type: string, authorSlug: string, type2: string, authorSlug2: string) => {
    const { data } = await supabaseClient.from(table).select(query).eq(type, authorSlug).eq(type2, authorSlug2);
  
    return { data };
}

export const fetchAuthor = (authorSlug: string, authorSlug2: string) => {
    return supabaseFetchMultipleEq('authors', 'metatitle, metadescription', 'username', authorSlug, 'cus_domain', authorSlug2);
}

export const fetchAllPosts = (authorSlug: string, authorSlug2: string) => {
    return supabaseFetchMultipleEq('posts', 'id, posttitle, title, excerpt, href, created_at, featured_imgsd, authors!inner(*), category!inner(name)', 'authors.username', authorSlug, 'authors.cus_domain', authorSlug2);
}

export const fetchAllCategories = (authorSlug: string, authorSlug2: string) => {
    return supabaseFetchMultipleEq('category', 'id, name, metadescription, href, created_at, authors!inner(*)', 'authors.username', authorSlug, 'authors.cus_domain', authorSlug2);
}