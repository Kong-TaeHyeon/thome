import actsRepository from "../../../../lib/repository/actsRepository.js";
import programRepository from "../../../../lib/repository/programRepository.js";
import storageRepository from "../../../../lib/repository/storageRepository.js";
import { supabase } from "../../../../lib/supabaseClient.js";

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
    const acts = await request.formData();

    const programId = params.programId;

    const title = acts.get("title");
    const subTitle = acts.get("subTitle");
    const duration = acts.get("duration");
    const isOvertime = acts.get("isOvertime");
    const imageFile = acts.get("imageFile");
    const order = acts.get("order");

    try {
      if (imageFile === "") {
        // 파일이 없는 경우.
        await actsRepository.insertAct({ act: { title, subTitle, duration, isOvertime, programId, order } });
      } else {
        // 이미지 파일이 있는 경우.
        let { imageUrl, imagePath } = await storageRepository.uploadFile({ file: imageFile, category: "act" });
        imageUrl = imageUrl.publicUrl;

        await actsRepository.insertAct({
          act: {
            title,
            subTitle,
            duration,
            isOvertime,
            programId,
            imageUrl,
            imagePath,
            order,
          },
        });
      }

      return "success";
    } catch (error) {
      console.error(error);
      return "fail";
    }
  },
};
