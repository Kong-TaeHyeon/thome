import { json } from "@sveltejs/kit";
import productRepository from "../../lib/repository/productRepository.js";
import storageRepository from "../../lib/repository/storageRepository.js";

export const DELETE = async ({ request }) => {
  try {
    const products = await request.json();

    const productIds = products.map((err) => err.id);

    const productImagePaths = await productRepository.fetchProductByIds({ productIds });

    await Promise.all([
      storageRepository.deleteFile({ imagePath: productImagePaths }),
      productRepository.deleteProductsById({ productIds }),
    ]);
    // await storageRepository.deleteFile({ imagePath: productImagePaths });
    // await productRepository.deleteProductsById({ productIds });

    return json(true);
  } catch (err) {
    console.error("product/server.js Error : ", err);
    return json(false);
  }
};
