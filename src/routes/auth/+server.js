import { json } from "@sveltejs/kit";
import { supabase } from "../../lib/supabaseClient.js";

export const GET = async ({ locals }) => {
  let userRole = locals?.userRole;

  if (userRole === "ADMIN") {
    const { error } = await locals.sb.auth.signOut();
    if (error) throw new Error(error.message);

    return json("logout");
  }
};
