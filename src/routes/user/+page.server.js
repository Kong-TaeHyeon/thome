import userRepository from "../../lib/repository/userRepository";

export const load = async () => {
  const users = await userRepository.fetchUsersByPagination();

  console.log(users[19].point);

  return { users };
};
