import couponRepository from "../../../lib/repository/couponRepository.js";

export const load = async ({ url }) => {
  const value = url.searchParams.get("value");
  const option = url.searchParams.get("option");

  const coupons = await couponRepository.fetchCouponByOption(option, value);

  return { coupons };
};
