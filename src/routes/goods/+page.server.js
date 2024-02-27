import goodsRepository from "../../lib/repository/goodsRepository.js";
import storageRepository from "../../lib/repository/storageRepository.js";
import { supabase } from "../../lib/supabaseClient.js";

export const load = async ({ url }) => {
  try {
    const pageNum = url.searchParams.get("pageNum") || 1;
    const goods = await goodsRepository.fetchGoodsWithPaging({ pageNum });
    const count = await goodsRepository.fetchTotalGoodsCount();
    return { goods, count };
  } catch (err) {
    console.error(err);
    return { goods: {} };
  }
};

export const actions = {
  save: async ({ request }) => {
    const goods = await request.formData();
    let newGoods = {};

    newGoods.name = goods.get("name");
    newGoods.price = goods.get("price");
    newGoods.description = goods.get("description");
    newGoods.imageUrl = goods.get("imageUrl");

    const imageFile = goods.get("imageFile");
    newGoods.id = goods.get("id");

    try {
      if (imageFile) {
        // Upload 할 파일이 있는 경우.
        const { imageUrl, imagePath } = await storageRepository.uploadFile({
          file: imageFile,
          category: "goods",
        });

        newGoods.imageUrl = imageUrl.publicUrl;
        newGoods.imagePath = imagePath;
      } else {
        newGoods.imageUrl = null;
        newGoods.imagePath = null;
      }

      await goodsRepository.upsertGoods({ goods: newGoods });

      return "success";
    } catch (err) {
      console.error(err);
      return err.message;
    }
  },
};
