import { supabase } from "../supabaseClient";

class PointRepository {
  // 적립 DN

  async fetchPointWeek() {
    // 현재 날짜
    let date = new Date();

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    // 일주일 전 날짜
    let aWeekAgo = new Date(year, month, day - 7);

    // 한달 전 날짜
    let aMonthAgo = new Date(year, month - 1, day);

    // 최근 일주일간 point 내역.
    const { data: weekPoints, error } = await supabase
      .from("point")
      .select("point")
      .lte("createdAt", date.toISOString())
      .gte("createdAt", aWeekAgo.toISOString());

    if (error) throw new Error(error.message);

    // 최근 한달간 point 내역.
    const { data: monthPoints, error: err } = await supabase
      .from("point")
      .select("point")
      .lte("createdAt", date.toISOString())
      .gte("createdAt", aMonthAgo.toISOString());

    if (err) throw new Error(err.message);

    return { weekPoints, monthPoints };
  }
}

export default new PointRepository();
