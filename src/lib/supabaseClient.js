import { createClient } from "@supabase/supabase-js";
import { env } from "$env/dynamic/public";

export const supabase = createClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_ANON_KEY);
export const supabaseAdmin = createClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_ROLE_KEY);
