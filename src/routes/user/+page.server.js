import userRepository from "../../lib/repository/userRepository";

export const load = async ({ url }) => {
  const pageNum = url.searchParams.get("pageNum") || 1;

  const users = await userRepository.fetchUsersByPagination(pageNum);
  const totalUserCount = await userRepository.fetchTotalUser();

  return { users, totalUserCount };
};
