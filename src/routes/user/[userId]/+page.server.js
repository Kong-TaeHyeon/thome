import pointRepository from "../../../lib/repository/pointRepository.js";
import userRepository from "../../../lib/repository/userRepository.js";
import { supabase } from "../../../lib/supabaseClient.js";

export const load = async ({ params }) => {
  const userId = params.userId;

  const { user, inviteUser } = await userRepository.fetchUserByUserId(userId);
  const { rangePoint } = await pointRepository.fetchRangePointByUserId(userId);
  const calRangePoint = rangePoint.reduce((acc, cur) => (acc += cur.point), 0);

  return { user, inviteUser, calRangePoint };
};

export const actions = {
  save: async ({ request }) => {
    try {
      const data = await request.formData();
      const id = data.get("id");
      const skinType = data.get("skinType");
      const gender = data.get("gender");
      const birthday = data.get("birthday");
      const thomeIndex = data.get("thomeIndex");

      const user = {
        skinType,
        gender,
        birthday,
        thomeIndex,
      };

      const { error } = await supabase.from("user").update(user).eq("id", id);

      if (error) {
        console.error("User Update Error : ", error.message);
        return "fail";
      }

      return "success";
    } catch (err) {
      console.error("User Update  Error : ", err.message);
    }
  },
};
