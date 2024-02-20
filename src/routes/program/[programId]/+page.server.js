import programRepository from "../../../lib/repository/programRepository.js";
import { supabase } from "../../../lib/supabaseClient.js";

export const load = async ({ params }) => {
  const programId = params.programId;

  if (programId === "null") {
    const program = {};
    return { program };
  }

  const { program } = await programRepository.fetchProgramById({ programId });

  return { program };
};

export const actions = {
  save: async ({ request, params }) => {
    const product = await request.formData();

    console.log(product);

    // 기본 정보.
    const basicInfo = {
      name: product.get("name"),
      isComingSoon: product.get("isComingSoon"),
      duration: product.get("duration"),
      feature: product.get("feature"),
      infoText: product.get("infoText"),
      ingredient: product.get("ingredient"),
      manual: product.get("manual"),
    };

    if (product.get("bannerImage") === "no") basicInfo.bannerImageUrl = null;
    else if (product.get("bannerImage") === "url") {
      basicInfo.bannerImageUrl = product.get("bannerImageUrl");
    } else {
      const file = product.get("bannerImageFile");
      // 파일 등록 후 url. 등록.
      const { data, error } = await supabase.storage
        .from("program-images")
        .upload(`img/${params.programId}/banner/${file.name}`, file, {
          cacheControl: "3600",
          upsert: true,
        });

      let { data: imageUrl } = await supabase.storage.from("program-images").getPublicUrl(data.path);
      imageUrl = imageUrl.publicUrl;
      basicInfo.bannerImageUrl = imageUrl;
    }

    if (product.get("productImage") === "no") basicInfo.productImageUrl = null;
    else if (product.get("productImage") === "url") {
      basicInfo.productImageUrl = product.get("productImageUrl");
    } else {
      const file = product.get("productImageFile");
      const { data, error } = await supabase.storage
        .from("program-images")
        .upload(`img/${params.programId}/product/${file.name}`, file, {
          cacheControl: "3600",
          upsert: true,
        });
      let { data: imageUrl } = await supabase.storage.from("program-images").getPublicUrl(data.path);
      imageUrl = imageUrl.publicUrl;
      basicInfo.productImageUrl = imageUrl;
    }

    if (product.get("bannerComingSoonImage") === "no") basicInfo.bannerImageUrlComingSoon = null;
    else if (product.get("bannerComingSoonImage") == "url") {
      basicInfo.bannerImageUrlComingSoon = product.get("bannerComingSoonImageUrl");
    } else {
      const file = product.get("bannerComingSoonImageFile");
      const { data, error } = await supabase.storage
        .from("program-images")
        .upload(`img/${params.programId}/bannerComingSoon/${file.name}`, file, {
          cacheControl: "3600",
          upsert: true,
        });

      let { data: imageUrl } = await supabase.storage.from("program-images").getPublicUrl(data.path);
      imageUrl = imageUrl.publicUrl;
      basicInfo.bannerImageUrlComingSoon = imageUrl;
    }

    if (params.programId === "null") {
      const { error } = await supabase.from("program").insert({ ...basicInfo });

      if (error) {
        console.error("Program Save(Insert) Err", error.message);
        return "Fail";
      }

      return "Success";
    }
    const { error } = await supabase
      .from("program")
      .update({ ...basicInfo })
      .eq("id", params.programId);

    if (error) {
      console.error("Program Save Err", error.message);
      return "Fail";
    }

    return "Success";
  },
};
