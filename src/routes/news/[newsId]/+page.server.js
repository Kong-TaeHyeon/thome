import newsRepository from "../../../lib/repository/newsRepository.js";

export const load = async ({ params }) => {
  const newsId = params.newsId;
  const { news } = await newsRepository.fetchNewsById({ newsId });

  return { news };
};
