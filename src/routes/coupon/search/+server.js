import { json } from "@sveltejs/kit";
import couponRepository from "../../../lib/repository/couponRepository.js";

export const GET = async ({ locals, url }) => {
  const value = url.searchParams.get("value");
  const option = url.searchParams.get("option");

  let coupons = await couponRepository.fetchCouponByOption(option, value);

  return json(coupons);
};
