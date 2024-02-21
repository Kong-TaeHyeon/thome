import { supabase } from "./lib/supabaseClient";

export const handle = async ({ event, resolve }) => {
  event.locals.getSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    return session;
  };

  event.locals.session = await event.locals.getSession();
  event.locals.userRole = event.locals.session?.user?.user_metadata?.role;
  event.locals.name = event.locals.session?.user?.user_metadata?.name;

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === "content-range";
    },
  });
};
