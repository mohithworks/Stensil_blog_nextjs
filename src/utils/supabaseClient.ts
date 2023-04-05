import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL:any = process.env.NEXT_SUPABASE_URL;
const SUPBASE_ANON_KEY:any = process.env.NEXT_SUPABASE_KEY;

const supabaseClient = createClient(SUPABASE_URL, SUPBASE_ANON_KEY);

export default supabaseClient;