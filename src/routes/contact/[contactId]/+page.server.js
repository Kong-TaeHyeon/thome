import contactRepository from "../../../lib/repository/contactRepository.js";

export const load = async ({ params }) => {
  const contactId = params.contactId;

  const contact = await contactRepository.fetchContactById(contactId);

  return { contact };
};
