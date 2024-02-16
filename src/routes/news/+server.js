import { json } from "@sveltejs/kit";
import newsRepository from "../../lib/repository/newsRepository.js";

export const DELETE = async ({ request }) => {
  try {
    const news = await request.json();

    const idList = news.map((err) => err.id);

    await newsRepository.deleteNews(idList);

    return json(true);
  } catch (err) {
    console.error("coupon/server.js Error : ", err);
    return json(false);
  }
};
