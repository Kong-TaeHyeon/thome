import { supabase } from "../supabaseClient";

class GoodsRepository {
  async fetchGoodsByName(name) {
    const { data: goods, error } = await supabase.from("goods").select("*").ilike("name", `%${name}%`);

    if (error) throw new Error(error.message);

    return goods;
  }
}

export default new GoodsRepository();
