import { json } from "@sveltejs/kit";
import userRepository from "../../lib/repository/userRepository";
import { supabaseAdmin } from "../../lib/supabaseClient.js";

export const GET = async () => {
  const users = await userRepository.fetchAllUser();

  return json(users);
};

export const DELETE = async ({ request }) => {
  try {
    const userIds = await request.json();
    // const deletePromises = userIds.map((user) => supabaseAdmin.auth.admin.deleteUser(user.id));

    await userRepository.deleteUserById({ userId: userIds });
    // await Promise.all(deletePromises);

    return json({ body: "Success" });
  } catch (err) {
    console.error(err);
    return json(err.message);
  }
};
