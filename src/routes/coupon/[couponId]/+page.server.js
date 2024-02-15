import couponRepository from "../../../lib/repository/couponRepository.js";

export const load = async ({ params }) => {
  const couponId = params.couponId;

  const coupon = await couponRepository.fetchCoupon(couponId);

  return { coupon };
};
