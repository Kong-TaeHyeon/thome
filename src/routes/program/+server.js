import { json } from "@sveltejs/kit";
import programRepository from "../../lib/repository/programRepository.js";
import storageRepository from "../../lib/repository/storageRepository.js";

export const DELETE = async ({ request }) => {
  try {
    const programs = await request.json();

    const programIds = programs.map((err) => err.id);

    const { programPaths } = await programRepository.fetchProgramByIds({ programIds });
    const extractedPaths = programPaths.flatMap((obj) => Object.values(obj)).filter((value) => value !== null);

    const { actPaths } = await programRepository.fetchActPathByProgramId({ programIds });

    const extractedImagePaths = actPaths
      .flatMap((array) => array.act.map((item) => item.imagePath))
      .filter((value) => value !== null);

    await Promise.all([
      programRepository.deleteProgramById({ programId: programIds }),
      storageRepository.deleteFile({ imagePath: extractedPaths }),
      storageRepository.deleteFile({ imagePath: extractedImagePaths }),
    ]);

    return json(true);
  } catch (err) {
    console.error("product/server.js Error : ", err);
    return json(false);
  }
};
