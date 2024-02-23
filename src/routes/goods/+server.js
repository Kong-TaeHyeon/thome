import { json } from "@sveltejs/kit";
import goodsRepository from "../../lib/repository/goodsRepository.js";

export const DELETE = async ({ request }) => {
  try {
    const goods = await request.json();

    const goodsIds = goods.map((err) => err.id);

    await goodsRepository.deleteGoodsById({ goodsId: goodsIds });

    return json(true);
  } catch (err) {
    console.error("product/server.js Error : ", err);
    return json(false);
  }
};
