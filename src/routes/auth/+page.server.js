import { json } from "@sveltejs/kit";
import { supabase } from "../../lib/supabaseClient.js";

export const load = async () => {};

export const actions = {
  /**
   * 로그인
   */

  signIn: async ({ request }) => {
    try {
      const data = await request.formData();

      const email = data.get("email");
      const password = data.get("password");

      const { data: user, error: err } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (err) throw new Error(err.message);
      return "success";
    } catch (err) {
      console.error("Auth Error : ", err);
      return "fail";
    }
  },
};
