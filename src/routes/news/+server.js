import { json } from "@sveltejs/kit";
import newsRepository from "../../lib/repository/newsRepository.js";

export const DELETE = async ({ request }) => {
  try {
    const news = await request.json();

    const idList = news.map((err) => err.id);

    await newsRepository.deleteNews(idList);

    return json(true);
  } catch (err) {
    console.error("news/server.js Error : ", err);
    return json(false);
  }
};

export const POST = async ({ request }) => {
  try {
    const news = await request.json();

    await newsRepository.updateNews({ news });

    return json(true);
  } catch (err) {
    console.error("news/server.js Error : ", err);
    return json(false);
  }
};
