import { json } from "@sveltejs/kit";
import productRepository from "../../lib/repository/productRepository.js";

export const DELETE = async ({ request }) => {
  try {
    const products = await request.json();

    const productIds = products.map((err) => err.id);

    await productRepository.deleteProductsById({ productIds });

    return json(true);
  } catch (err) {
    console.error("product/server.js Error : ", err);
    return json(false);
  }
};
