import { json } from "@sveltejs/kit";
import { supabase, supabaseAdmin } from "../../lib/supabaseClient.js";

export const DELETE = async ({ request }) => {
  const admins = await request.json();
  const ids = admins.map((err) => err.id);

  try {
    // Auth 삭제
    admins.forEach(async (test) => {
      const { error } = await supabaseAdmin.auth.admin.deleteUser(test.id);

      if (error) throw new Error(error.message);
    });

    const { error: deleteUser } = await supabase.from("admin").delete().in("id", ids);

    if (deleteUser) throw new Error(deleteUser.message);
    return json(true);
  } catch (error) {
    console.error(error.message);
    return json(false);
  }
};

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
    id: data.user.id,
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
