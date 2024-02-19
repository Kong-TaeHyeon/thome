import { supabase } from "../supabaseClient";

class ProductRepository {
  async fetchProductList() {
    const { data: products, error: err } = await supabase.from("product").select("*");

    if (err) throw new Error(err.message);

    return { products };
  }

  async fetchProductById({ productId }) {
    const { data: product, error: err } = await supabase.from("product").select("*").eq("id", productId).maybeSingle();

    if (err) throw new Error(err.message);

    return { product };
  }

  async deleteProductsById({ productIds }) {
    const { error } = await supabase.from("product").delete().in("id", productIds);

    if (error) throw new Error(error.message);
  }
}

export default new ProductRepository();
