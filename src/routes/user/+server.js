import { json } from "@sveltejs/kit";
import userRepository from "../../lib/repository/userRepository";

export const GET = async () => {
  const users = await userRepository.fetchAllUser();

  return json(users);
};
