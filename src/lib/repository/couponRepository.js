import { supabase } from "../supabaseClient";

class CouponRepository {
  async fetchCouponList() {
    const { data: coupon, error, status } = await supabase.from("coupon").select("*").is("deletedAt", null);

    if (error) throw new Error(error.message);

    return coupon;
  }

  async fetchCoupon(couponId) {
    const {
      data: coupon,
      error,
      status,
    } = await supabase.from("coupon").select("*,  goods(*), user(*)").eq("id", couponId).maybeSingle();

    if (error) throw new Error(error.message);
    return coupon;
  }

  /**
   * @param {Integer} pageNum : default 0
   */
  async fetchCouponListWithPaging(pageNum = 1) {
    let page = (Number(pageNum) - 1) * 20;

    if (page < 0) page = 0;

    const { data: coupon, error } = await supabase
      .from("coupon")
      .select("*, goods(name), user(nickname)")
      .is("deletedAt", null)
      .order("createdAt", { ascending: true })
      .range(page, page + 19);

    if (error) throw new Error(error.message);

    return coupon;
  }

  async fetchTotalCount() {
    const { count, error } = await supabase.from("coupon").select("*", { count: "exact" }).is("deletedAt", null);

    if (error) throw new Error(error.message);

    return count;
  }

  async fetchCouponByOption(option, value) {
    if (option === "code") {
      // 쿠폰 코드로 검색
      const { data: coupons, error } = await supabase
        .from("coupon")
        .select("* , goods(*), user(*)")
        .ilike("code", `%${value}%`);
      return coupons;
    }

    if (option === "user") {
      // user 이름으로 검색
    }

    if (option === "goods") {
      // goods 명으로 검색
    }
  }

  async deleteCoupon(idList) {
    const { data, error } = await supabase.from("coupon").delete().in("id", idList);

    if (error) throw new Error(error.message);

    return data;
  }

  async createCoupon(coupon) {
    const createdAt = new Date();

    coupon.createdAt = createdAt;
    const { error } = await supabase.from("coupon").insert(coupon);

    if (error) throw new Error(error.message);

    return true;
  }
}

export default new CouponRepository();
