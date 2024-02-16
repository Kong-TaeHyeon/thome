import newsRepository from "../../lib/repository/newsRepository.js";

export const load = async ({ url }) => {
  const pageNum = url.searchParams.get("pageNum") || 1;
  const { news } = await newsRepository.fetchNewsByPaging({ pageNum });
  const { totalNewsCount } = await newsRepository.fetchTotalNewCount();
  return { news, totalNewsCount };
};
