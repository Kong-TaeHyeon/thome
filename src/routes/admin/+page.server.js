import { supabase } from "../../lib/supabaseClient";

export const load = async () => {
  const { data: admins, error: err } = await supabase.from("admin").select("*");

  if (err) console.error(err.message);

  return { admins };
};
