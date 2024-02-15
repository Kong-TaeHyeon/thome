import contactRepository from "../../lib/repository/contactRepository";

export const load = async ({ url }) => {
  const filter = url.searchParams.get("filter") || "all";

  const contacts = await contactRepository.fetchContactByOption(filter);

  return { contacts };
};
