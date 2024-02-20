import { json } from "@sveltejs/kit";
import { supabase } from "../../lib/supabaseClient.js";

export const load = async () => {};

export const actions = {
  signUp: async ({ request }) => {
    try {
      const data = await request.formData();

      const email = data.get("email");
      const password = data.get("password");
      const name = data.get("name");

      const { data: user, error: err } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: "ADMIN",
          },
        },
      });

      if (err) throw new Error(err.message);

      const { error } = await supabase.from("admin").insert({
        name,
        email,
      });
      if (error) throw new Error(err.message);
      return "success";
    } catch (err) {
      console.error("Auth  Error : ", err);
      return "fail";
    }
  },

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
