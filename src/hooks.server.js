import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { env } from "$env/dynamic/public";

export const handle = async ({ event, resolve }) => {
  event.locals.sb = createServerClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      get: (key) => event.cookies.get(key),
      set: (key, value, options) => {
        event.cookies.set(key, value, options);
      },
      remove: (key, options) => {
        event.cookies.delete(key, options);
      },
    },
    cookieOptions: { secure: false },
  });

  event.locals.sb_admin = createServerClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_ROLE_KEY, {
    cookies: {
      get: (key) => event.cookies.get(key),
      set: (key, value, options) => {
        event.cookies.set(key, value, options);
      },
      remove: (key, options) => {
        event.cookies.delete(key, options);
      },
    },
    cookieOptions: { secure: false },
  });

  event.locals.getSession = async () => {
    const {
      data: { session },
    } = await event.locals.sb.auth.getSession();
    return session;
  };

  event.locals.session = await event.locals.getSession();
  event.locals.userRole = event.locals.session?.user?.user_metadata?.role;
  event.locals.userName = event.locals.session?.user?.user_metadata?.name;

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === "content-range";
    },
  });
};
