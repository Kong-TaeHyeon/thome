import programRepository from "../../../lib/repository/programRepository.js";
import storageRepository from "../../../lib/repository/storageRepository.js";
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

    var program = {};

    if (params.programId !== "null")
      var { data: program } = await supabase.from("program").select("*").eq("id", params.programId).maybeSingle();

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

    async function processImage(imageType, fileKey, urlKey) {
      const imageTypeValue = product.get(imageType);
      if (imageTypeValue === "no") {
        basicInfo[urlKey] = null;
        basicInfo[imageType + "FilePath"] = null;

        await storageRepository.deleteFile({ imagePath: [program[imageType + "FilePath"]] });
      } else if (imageTypeValue === "url") {
        // 이미지를 그대로 두는 경우.
        basicInfo[urlKey] = product.get(urlKey);
      } else {
        const file = product.get(fileKey);
        const { imagePath, imageUrl } = await storageRepository.uploadFile({ file, category: `program/${imageType}` });
        if (imageUrl !== null) {
          basicInfo[urlKey] = imageUrl.publicUrl;
          basicInfo[imageType + "FilePath"] = imagePath;
        }
      }
    }
    // 각 이미지(배너 , 상품, 커밍순) 비동기 처리.
    await Promise.all([
      processImage("bannerImage", "bannerImageFile", "bannerImageUrl"),
      processImage("productImage", "productImageFile", "productImageUrl"),
      processImage("bannerComingSoonImage", "bannerComingSoonImageFile", "bannerImageUrlComingSoon"),
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
      console.error("Program Save Err : ", error.message);
      return "Fail";
    }

    return "Success";
  },
};
