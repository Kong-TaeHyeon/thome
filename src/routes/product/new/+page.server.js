import storageRepository from "../../../lib/repository/storageRepository.js";
import { supabase } from "../../../lib/supabaseClient";

export const load = async () => {
  const { data: programs, error } = await supabase.from("program").select("*");

  return { programs };
};

export const actions = {
  save: async ({ request }) => {
    const data = await request.formData();

    const name = data.get("name");
    const ingredient = data.get("ingredient");
    const description = data.get("description");
    const feature = data.get("feature");
    const manual = data.get("manual");
    const shoppingUrl = data.get("shoppingUrl");
    const programId = data.get("programId");
    const img = data.get("img");

    if (img !== "null") {
      try {
        // Image Upload
        const { imageUrl, imagePath } = await storageRepository.uploadFile({ file: img, category: "product" });

        // Product Update
        const product = {
          name,
          ingredient,
          feature,
          manual,
          shoppingUrl,
          programId,
          description,
          imageUrl: imageUrl.publicUrl,
          imagePath,
        };

        if (product.programId === "null") product.programId = null;
        const { error: updateErr } = await supabase.from("product").insert(product);

        if (updateErr) {
          console.error("Update Err (/new) : ", updateErr.message);
          return "Fail";
        }

        return "Success";
      } catch (err) {
        console.error("Prduct Error : ", err.message);
        return "Fail";
      }
    } else {
      const product = {
        name,
        ingredient,
        feature,
        manual,
        shoppingUrl,
        programId,
        description,
      };

      if (product.programId === "null") product.programId = null;
      const { error: insertErr } = await supabase.from("product").insert(product);

      if (insertErr) {
        console.error("Product insertErr : ", insertErr.message);
        return "Fail";
      }
      return "Success";
    }
  },
};
