import { json } from "@sveltejs/kit";
import programRepository from "../../lib/repository/programRepository.js";

export const DELETE = async ({ request }) => {
  try {
    const programs = await request.json();

    const programIds = programs.map((err) => err.id);

    await programRepository.deleteProgramById({ programId: programIds });

    return json(true);
  } catch (err) {
    console.error("product/server.js Error : ", err);
    return json(false);
  }
};
