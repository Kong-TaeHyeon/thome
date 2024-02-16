import newsRepository from "../../../lib/repository/newsRepository";

export const load = async () => {};

export const actions = {
  save: async ({ request }) => {
    const data = await request.formData();
    const title = data.get("title");
    const content = data.get("content");

    await newsRepository.insertNews({ news: { title, content } });
  },
};
