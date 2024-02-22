import programRepository from "../../../lib/repository/programRepository.js";
import storageRepostiory from "../../../lib/repository/storageRepostiory.js";
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

// 중복 코드를 제거.
export const actions = {
  save: async ({ request, params }) => {
    const product = await request.formData();

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

    async function processImage(imageType, fileKey, urlKey, folderPath) {
      const imageTypeValue = product.get(imageType);
      if (imageTypeValue === "no") {
        basicInfo[urlKey] = null;
      } else if (imageTypeValue === "url") {
        basicInfo[urlKey] = product.get(urlKey);
      } else {
        const file = product.get(fileKey);
        const imageUrl = await storageRepostiory.uploadImage({ file, folderPath });
        if (imageUrl !== null) {
          basicInfo[urlKey] = imageUrl;
        }
      }
    }
    // 각 이미지(배너 , 상품, 커밍순) 비동기 처리.
    await Promise.all([
      processImage("bannerImage", "bannerImageFile", "bannerImageUrl", `img/${params.programId}/banner`),
      processImage("productImage", "productImageFile", "productImageUrl", `img/${params.programId}/product`),
      processImage(
        "bannerComingSoonImage",
        "bannerComingSoonImageFile",
        "bannerImageUrlComingSoon",
        `img/${params.programId}/bannerComingSoon`,
      ),
    ]);

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
