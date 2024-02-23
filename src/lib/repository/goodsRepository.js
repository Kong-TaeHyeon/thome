import { supabase } from "../supabaseClient";

class GoodsRepository {
  async fetchTotalGoodsCount() {
    const { count, error } = await supabase.from("goods").select("*", { count: "exact" });
    if (error) throw new Error(error);

    return count;
  }

  async fetchGoodsWithPaging({ pageNum }) {
    const page = (Number(pageNum) - 1) * 20;

    const { data: goods, error } = await supabase
      .from("goods")
      .select("*")
      .range(page, page + 19);

    if (error) throw new Error(error);

    return goods;
  }

  async fetchGoodsByName(name) {
    const { data: goods, error } = await supabase.from("goods").select("*").ilike("name", `%${name}%`);

    if (error) throw new Error(error);

    return goods;
  }

  async deleteGoodsById({ goodsId }) {
    const { error } = await supabase.from("goods").delete().in("id", goodsId);

    if (error) throw new Error(error);
  }

  async upsertGoods({ goods }) {
    // Goods 동일 이름이 존재할 경우 =>

    if (goods.id !== "undefined") {
      const { error } = await supabase
        .from("goods")
        .update({ name: goods.name, price: goods.price, description: goods.description, imageUrl: goods.imageUrl })
        .eq("id", goods.id);
      if (error) throw new Error(error);
    } else {
      const { data } = await supabase.from("goods").select("*").eq("name", goods.name);
      if (data) throw new Error("중복된 굿즈 이름");

      const { error } = await supabase
        .from("goods")
        .insert({ name: goods.name, price: goods.price, description: goods.description, imageUrl: goods.imageUrl });

      if (error) throw new Error(error);
    }
  }
}

export default new GoodsRepository();
