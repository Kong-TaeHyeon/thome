import { json } from "@sveltejs/kit";
import { supabase } from "../../lib/supabaseClient.js";

export const POST = async ({ request }) => {
  const admin = await request.json();

  // Auth 가입.
  const { data, error: authErr } = await supabase.auth.signUp({
    email: admin.email,
    password: admin.password,

    options: {
      data: {
        role: "ADMIN",
        name: admin.name,
      },
      redirectTo: false,
    },
  });

  if (authErr) {
    console.error("Auth Error (/admin) : ", authErr.message);
    return json(false);
  }

  const { error: insertErr } = await supabase.from("admin").insert({
    email: admin.email,
    name: admin.name,
    role: admin.role,
  });

  if (insertErr) {
    console.error("Insert Error (/admin) : ", insertErr.message);
    return json(false);
  }

  return json(true);
};
