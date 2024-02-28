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
    const updateUserPromises = userIds.map((userId) => supabaseAdmin.auth.admin.deleteUser(userId));
    const result = await Promise.all(updateUserPromises);
    result.forEach(({ data, error }) => {
      if (error) {
        console.error(error);
      }
    });
    await userRepository.deleteUserById({ userId: userIds });
    return json({ body: "Success" });
  } catch (err) {
    console.error(err);
    return json(err.message);
  }
};
