import { supabase } from "../supabaseClient";

class UserRepository {
  // 총회원수.
  async fetchTotalUser() {
    const { count, error } = await supabase.from("user").select("*", { count: "exact" });

    if (error) throw new Error(error.message);

    console.log(count);
    return count;
  }

  async fetchUsersByPagination(page = 1) {
    const { data: users, error } = await supabase
      .from("user")
      .select("*, point(*)")
      .order("createdAt", { ascending: true })
      .range(page, page + 19);
    if (error) throw new Error(error.message);

    return users;
  }

  async fetchNewUser() {
    // 신규가입자

    let date = new Date();

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    // 일주일 전 날짜
    let aWeekAgo = new Date(year, month, day - 7);

    // 한달 전 날짜
    let aMonthAgo = new Date(year, month - 1, day);

    const { count: weekCount, error: err1 } = await supabase
      .from("user")
      .select("*", { count: "exact" })
      .lte("createdAt", date.toISOString())
      .gte("createdAt", aWeekAgo.toISOString());

    if (err1) throw new Error(err1.message);

    const { count: monthCount, error: err2 } = await supabase
      .from("user")
      .select("*", { count: "exact" })
      .lte("createdAt", date.toISOString())
      .gte("createdAt", aMonthAgo.toISOString());
    if (err2) throw new Error(err2.message);

    return { weekCount, monthCount };
  }
}

export default new UserRepository();
