import { json } from "@sveltejs/kit";
import { supabase, supabaseAdmin } from "../../lib/supabaseClient.js";

export const DELETE = async ({ locals, request }) => {
  const adminId = locals.session.user.id;

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

export const POST = async ({ locals, request }) => {
  const admin = await request.json();

  const adminId = locals.session.user.id;
  const { data: admin1 } = await supabase.from("admin").select("*").eq("id", adminId).maybeSingle();
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
    password: admin.password,
  });

  if (insertErr) {
    console.error("Insert Error (/admin) : ", insertErr.message);
    return json(false);
  }

  // await supabase.auth.signOut();

  // await supabase.auth.signInWithPassword({
  //   email: admin1.email,
  //   password: admin1.password,
  // });

  return json(true);
};
