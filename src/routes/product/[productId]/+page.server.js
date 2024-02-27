import productRepository from "../../../lib/repository/productRepository";
import storageRepository from "../../../lib/repository/storageRepository.js";
import { supabase } from "../../../lib/supabaseClient.js";

export const load = async ({ params }) => {
  const productId = params.productId;
  const { product } = await productRepository.fetchProductById({ productId });
  const { data: programs } = await supabase.from("program").select("*");

  return { product, programs };
};

export const actions = {
  save: async ({ request }) => {
    const data = await request.formData();

    const id = data.get("id");
    const name = data.get("name");
    const ingredient = data.get("ingredient");
    const description = data.get("description");
    const feature = data.get("feature");
    const manual = data.get("manual");
    const shoppingUrl = data.get("shoppingUrl");
    const programId = data.get("programId");
    const img = data.get("img");

    if (img) {
      try {
        // 기존 이미지 삭제.
        const { data } = await supabase.from("product").select("imagePath").eq("id", id).maybeSingle();
        const deletedFilePath = data.imagePath;
        await storageRepository.deleteFile({ imagePath: deletedFilePath });

        // Image Upload
        let { imageUrl, imagePath } = await storageRepository.uploadFile({ file: img, category: "product" });
        imageUrl = imageUrl.publicUrl;

        // Product Update
        const product = {
          name,
          ingredient,
          feature,
          manual,
          shoppingUrl,
          programId,
          description,
          imageUrl,
          imagePath,
        };
        if (product.programId === "null") product.programId = null;
        const { error: updateErr } = await supabase.from("product").update(product).eq("id", id);

        if (updateErr) throw new Error(updateErr.message);

        return "Success";
      } catch (err) {
        console.error("Product Error : ", err.message);
      }
    } else {
      let imageUrl = null;
      let imagePath = null;
      const product = {
        name,
        ingredient,
        feature,
        manual,
        shoppingUrl,
        programId,
        description,
        imageUrl,
        imagePath,
      };
      const { error: updateErr } = await supabase.from("product").update(product).eq("id", id);

      if (updateErr) {
        console.error("Product Update Error : ", updateErr.message);
        return "Fail";
      }
      return "Success";
    }
  },
};
