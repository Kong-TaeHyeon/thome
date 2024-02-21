import contactRepository from "../../lib/repository/contactRepository";

export const load = async ({ url }) => {
  const filter = url.searchParams.get("filter") || "all";
  const pageNum = url.searchParams.get("pageNum") || 1;

  const { contacts } = await contactRepository.fetchContactByOptionWithPaging({ filter, pageNum });

  const { count } = await contactRepository.fetchTotalCount();

  return { contacts, count };
};
