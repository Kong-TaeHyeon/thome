import { json } from "@sveltejs/kit";
import couponRepository from "../../lib/repository/couponRepository.js";

export const DELETE = async ({ request }) => {
  try {
    const coupons = await request.json();

    const idList = coupons.map((err) => err.id);

    await couponRepository.deleteCoupon(idList);

    return json(true);
  } catch (err) {
    console.error("coupon/server.js Error : ", err);
    return json(false);
  }
};
