import { supabase } from "../supabaseClient";
import storageRepository from "./storageRepository";

class GoodsRepository {
  async fetchGoodsByIds({ goodsIds }) {
    const { data: goods, error } = await supabase.from("goods").select("imagePath").in("id", goodsIds);

    if (error) throw new Error(error.message);

    return goods;
  }

  async fetchTotalGoodsCount() {
    const { count, error } = await supabase.from("goods").select("*", { count: "exact" }).is("deletedAt", null);
    if (error) throw new Error(error.message);

    return count;
  }

  async fetchGoodsWithPaging({ pageNum }) {
    const page = (Number(pageNum) - 1) * 20;

    const { data: goods, error } = await supabase
      .from("goods")
      .select("*")
      .is("deletedAt", null)
      .range(page, page + 19);

    if (error) throw new Error(error);

    return goods;
  }

  async fetchGoodsByName(name) {
    const { data: goods, error } = await supabase
      .from("goods")
      .select("*")
      .is("deletedAt", null)
      .ilike("name", `%${name}%`);

    if (error) throw new Error(error);

    return goods;
  }

  async deleteGoodsById({ goodsId }) {
    let date = new Date();
    const { error } = await supabase.from("goods").update({ deletedAt: date.toISOString() }).in("id", goodsId);

    if (error) throw new Error(error);
  }

  async upsertGoods({ goods }) {
    // Goods 동일 이름이 존재할 경우 =>

    if (goods.id !== "undefined") {
      // Update 하기 전에 삭제를 해야지.
      const { data } = await supabase.from("goods").select("imagePath").eq("id", goods.id).maybeSingle();

      await Promise.all([
        storageRepository.deleteFile({ imagePath: data.imagePath }),
        supabase
          .from("goods")
          .update({
            name: goods.name,
            price: goods.price,
            description: goods.description,
            imageUrl: goods.imageUrl,
            imagePath: goods.imagePath,
          })
          .eq("id", goods.id),
      ]);
    } else {
      const { data } = await supabase.from("goods").select("*").eq("name", goods.name);
      if (data.length !== 0) {
        throw new Error("중복된 굿즈 이름");
      }

      const { error } = await supabase.from("goods").insert({
        name: goods.name,
        price: goods.price,
        description: goods.description,
        imageUrl: goods.imageUrl,
        imagePath: goods.imagePath,
      });

      if (error) throw new Error(error.message);
    }
  }
}

export default new GoodsRepository();
