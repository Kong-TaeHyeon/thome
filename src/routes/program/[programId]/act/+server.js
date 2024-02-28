import { json } from "@sveltejs/kit";
import actsRepository from "../../../../lib/repository/actsRepository.js";
import storageRepository from "../../../../lib/repository/storageRepository.js";

export const DELETE = async ({ request, params }) => {
  const programId = params.programId;
  const body = await request.json();

  const { deletedAct } = await actsRepository.deleteActById({ actId: body.actId });

  if (deletedAct[0].imagePath !== null) await storageRepository.deleteFile({ imagePath: deletedAct[0].imagePath });

  await actsRepository.updateOrder({ programId, standardOrder: body.order });

  return json(true);
};
