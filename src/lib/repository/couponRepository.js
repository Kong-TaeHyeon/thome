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
      .select("*, goods(name,price), user(nickname)")
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
        .is("deletedAt", null)
        .ilike("code", `%${value}%`);
      return coupons;
    }
  }

  async deleteCoupon(idList) {
    const date = new Date();
    const { data, error } = await supabase.from("coupon").update({ deletedAt: date.toISOString() }).in("id", idList);

    if (error) throw new Error(error.message);

    return data;
  }
  // 랜덤 넘버 발행.

  generateRandomValue() {
    var characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var randomValue = "";

    for (var i = 0; i < 10; i++) {
      var randomIndex = Math.floor(Math.random() * characters.length);
      randomValue += characters[randomIndex];
    }

    return randomValue;
  }

  async createCoupon(coupon) {
    const createdAt = new Date();

    coupon.createdAt = createdAt;

    let codes = [];

    for (let i = 1; i < coupon.quantity; i++) {
      codes.push(this.generateRandomValue());
    }

    // 이미 존재하는 쿠폰이 있는지 확인.
    let { data, error: searchErr } = await supabase.from("coupon").select("coupon").in("code", codes);

    while (data) {
      for (let i = 1; i < coupon.quantity; i++) {
        codes.push(this.generateRandomValue());
      }

      let selectSearch = await supabase.from("coupon").select("coupon").in("code", codes);
      data = selectSearch.data;
    }

    let coupons = [];

    for (let i = 0; i < codes.length; i++) {
      coupons.push({
        code: codes[i],
        goodsId: coupon.goodsId,
        createdAt: createdAt,
      });
    }

    const { error } = await supabase.from("coupon").insert(coupons);

    if (error) throw new Error(error.message);

    return true;
  }
}

export default new CouponRepository();
