import productRepository from "../../lib/repository/productRepository";

export const load = async ({ url }) => {
  const pageNum = url.searchParams.get("pageNum") || 1;
  const { products } = await productRepository.fetchProductsByPaging({ pageNum });
  const { count } = await productRepository.fetchTotalCount();

  return { products, count };
};

export const actions = {
  delete: async ({ request }) => {
    const data = await request.formData();
    const products = data.get("products");
    await productRepository.deleteProductsById({ productIds: products });
    return "Success";
  },
};
