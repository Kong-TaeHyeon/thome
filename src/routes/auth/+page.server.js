import { supabase } from "../../lib/supabaseClient.js";

export const load = async () => {};

export const actions = {
  /**
   * 로그인 / 회원가입 alert 를 위한 로직 추가하기.
   */

  signUp: async ({ request }) => {
    try {
      const data = await request.formData();

      const email = data.get("email");
      const password = data.get("password");

      const { data: user, error: err } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: "ADMIN",
          },
        },
      });
    } catch (err) {
      console.error("Auth  Error : ", err);
    }
  },

  signIn: async ({ request }) => {
    try {
      const data = await request.formData();

      const email = data.get("email");
      const password = data.get("password");

      const { data: user, error: err } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
    } catch (err) {
      console.error("Auth Error : ", err);
    }
  },
};
