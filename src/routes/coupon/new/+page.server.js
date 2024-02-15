import couponRepository from "../../../lib/repository/couponRepository.js";

export const actions = {
  save: async ({ request }) => {
    try {
      const data = await request.formData();

      const code = data.get("code");
      const goodsId = data.get("goods");

      const coupon = {
        code: code,
        goodsId: goodsId,
      };

      const result = await couponRepository.createCoupon(coupon);

      if (result) return "Success";
    } catch (err) {
      console.error("Create Coupon Error : ", err);
      return "fail";
    }
  },
};
