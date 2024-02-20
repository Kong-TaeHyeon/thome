import programRepository from "../../lib/repository/programRepository.js";

export const load = async ({ url }) => {
  const pageNum = url.searchParams.get("pageNum") || 1;

  const { programs } = await programRepository.fetchProgramByPaging({ pageNum });
  const totalProgramCount = await programRepository.fetchTotalProcutCount();

  return { programs, totalProgramCount };
};
