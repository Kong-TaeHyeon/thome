import { redirect } from "@sveltejs/kit";

import * as transliteration from "transliteration";

export const load = async ({ locals, url }) => {
  let userRole = locals?.userRole;

  if (userRole !== "ADMIN" && url.pathname !== "/auth") {
    throw redirect(301, "/auth");
  }

  if (url.pathname == "/auth") {
    if (userRole === "ADMIN") throw redirect(301, "/");
  }

  return { userRole };
};
