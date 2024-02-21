import { createClient } from "@supabase/supabase-js";
import { env } from "$env/dynamic/public";

console.log(env.PUBLIC_SUPABASE_ROLE_KEY);
console.log(env);
export const supabase = createClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_ANON_KEY, env.SERVICE_ROLE_SECRET);
export const supabaseAdmin = createClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_ROLE_KEY);
