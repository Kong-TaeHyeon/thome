import { supabase } from "../supabaseClient";

class ProductRepository {
  async fetchTotalCount() {
    const { count, error } = await supabase.from("product").select("*", { count: "exact" });
    if (error) throw new Error(error);
    return { count };
  }

  async fetchProductsByPaging({ pageNum }) {
    const page = (Number(pageNum) - 1) * 20;

    const { data: products, error: err } = await supabase
      .from("product")
      .select("*")
      .range(page, page + 19);

    if (err) throw new Error(err.message);

    return { products };
  }

  async fetchProductById({ productId }) {
    const { data: product, error: err } = await supabase.from("product").select("*").eq("id", productId).maybeSingle();

    if (err) throw new Error(err.message);

    return { product };
  }

  async fetchProductByIds({ productIds }) {
    const { data: productPaths, error } = await supabase.from("product").select("*").in("id", productIds);

    return productPaths.map((productPath) => productPath.imagePath);
  }

  async deleteProductsById({ productIds }) {
    const { error } = await supabase.from("product").delete().in("id", productIds);

    if (error) throw new Error(error.message);
  }
}

export default new ProductRepository();
