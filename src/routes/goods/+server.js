import { json } from "@sveltejs/kit";
import goodsRepository from "../../lib/repository/goodsRepository.js";
import storageRepository from "../../lib/repository/storageRepository.js";

export const DELETE = async ({ request }) => {
  try {
    const goods = await request.json();

    const goodsIds = goods.map((err) => err.id);

    const goodsPaths = await goodsRepository.fetchGoodsByIds({ goodsIds });

    const paths = goodsPaths.map((path) => path.imagePath);

    await Promise.all([
      storageRepository.deleteFile({ imagePath: paths }),
      goodsRepository.deleteGoodsById({ goodsId: goodsIds }),
    ]);
    // await storageRepository.deleteFile({ filePath: goodsPaths });
    // await goodsRepository.deleteGoodsById({ goodsId: goodsIds });

    return json(true);
  } catch (err) {
    console.error("product/server.js Error : ", err);
    return json(false);
  }
};
