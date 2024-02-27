import { json } from "@sveltejs/kit";
import programRepository from "../../lib/repository/programRepository.js";
import storageRepository from "../../lib/repository/storageRepository.js";

export const DELETE = async ({ request }) => {
  try {
    const programs = await request.json();

    const programIds = programs.map((err) => err.id);

    const { programPaths } = await programRepository.fetchProgramByIds({ programIds });

    const extractedPaths = programPaths.flatMap((obj) => Object.values(obj)).filter((value) => value !== null);

    await Promise.all([
      programRepository.deleteProgramById({ programId: programIds }),
      storageRepository.deleteFile({ imagePath: extractedPaths }),
    ]);

    return json(true);
  } catch (err) {
    console.error("product/server.js Error : ", err);
    return json(false);
  }
};
