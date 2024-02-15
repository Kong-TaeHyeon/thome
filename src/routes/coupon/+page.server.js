import couponRepository from "../../lib/repository/couponRepository";

export const load = async ({ url }) => {
  const pageNum = url.searchParams.get("pageNum") || 1;

  const coupon = await couponRepository.fetchCouponListWithPaging(pageNum);

  const totalCouponCount = await couponRepository.fetchTotalCount();

  return { coupon, totalCouponCount };
};
