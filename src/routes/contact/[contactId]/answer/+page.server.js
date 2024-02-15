import contactRepository from "../../../../lib/repository/contactRepository.js";

export const load = async ({ params }) => {
  const contactId = params.contactId;

  const contact = await contactRepository.fetchContactById(contactId);

  return { contact };
};

export const actions = {
  save: async ({ request }) => {
    try {
      const data = await request.formData();

      const id = data.get("id");
      const status = data.get("status");
      const answer = data.get("answer");
      const userId = data.get("userId");

      const contact = {
        id,
        status,
        answer,
        userId,
      };

      const result = await contactRepository.updateContact({ contact });

      if (result) return "Success";
    } catch (err) {
      console.error("Create Coupon Error : ", err);
      return "fail";
    }
  },
};
