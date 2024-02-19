import { json } from "@sveltejs/kit";
import { supabase } from "../../lib/supabaseClient.js";

export const GET = ({ locals }) => {
  let userRole = locals?.userRole;

  if (userRole === "ADMIN") {
    const { error } = supabase.auth.signOut();
    if (error) throw new Error(error.message);

    return json("logout");
  }
};
