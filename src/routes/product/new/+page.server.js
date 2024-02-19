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

    if (img) {
      try {
        // Image Upload
        const { error: imageErr } = await supabase.storage.from("program-images").upload(`product/${img.name}`, img, {
          cacheControl: "3600",
          upsert: false,
        });
        // Image Url
        let { data: imageUrl } = await supabase.storage.from("program-images").getPublicUrl(`product/${img.name}`);
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
        };

        const { error: updateErr } = await supabase.from("product").insert(product);

        return "Success";
      } catch (err) {
        console.error("Prduct Error : ", err.message);
      }
    } else {
      let imageUrl = null;
      const product = {
        name,
        ingredient,
        feature,
        manual,
        shoppingUrl,
        programId,
        description,
        imageUrl,
      };
      const { error: updateErr } = await supabase.from("product").insert(product);
      return "Success";
    }
  },
};
