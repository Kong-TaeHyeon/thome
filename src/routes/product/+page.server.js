import productRepository from "../../lib/repository/productRepository";

export const load = async () => {
  const { products } = await productRepository.fetchProductList();

  return { products };
};

export const actions = {
  delete: async ({ request }) => {
    const data = await request.formData();
    const products = data.get("products");
    await productRepository.deleteProductsById({ productIds: products });
    return "Success";
  },
};
