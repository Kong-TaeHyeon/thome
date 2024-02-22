import { supabase } from "../supabaseClient";

class UserRepository {
  async fetchAllUser() {
    const { data: users, error } = await supabase
      .from("user")
      .select("* , point(*)")
      .gt("point.expiredAt", new Date().toISOString())
      .order("createdAt", { ascending: true });

    if (error) throw new Error(error.message);

    return users;
  }

  // 총회원수.
  async fetchTotalUser() {
    const { count, error } = await supabase.from("user").select("*", { count: "exact" });

    if (error) throw new Error(error.message);

    return count;
  }

  async fetchUsersByPagination(pageNum = 1) {
    let page = (Number(pageNum) - 1) * 20;

    if (page < 0) page = 0;

    const { data: users, error } = await supabase
      .from("user")
      .select("* , point(*)")
      .gt("point.expiredAt", new Date().toISOString())
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

  // 유저 한명의 세부 정보
  async fetchUserByUserId(userId) {
    const { data: user, error: userErr } = await supabase
      .from("user")
      .select(
        "*, point(*),contact(*), schedule(*, program(*)), coupon(*, goods(*)), record(*,schedule(program(*))),inviteUser!fromUserId(*)",
      )
      .eq("id", userId)
      .gt("point.expiredAt", new Date().toISOString())
      .order("createdAt", {
        foreignTable: "contact",
        ascending: false,
      })
      .order("createdAt", {
        foreignTable: "schedule",
        ascending: false,
      })
      .maybeSingle();

    if (userErr) throw new Error("fetch User Error : ", userErr.message);

    // 초대 목록
    const { data: inviteUser, error: inviteErr } = await supabase
      .from("inviteUser")
      .select("*, user!userId(email)")
      .eq("fromUserId", userId);

    if (inviteErr) throw new Error("fetch Invite User Error : ", inviteErr);

    return { user, inviteUser };
  }
}

export default new UserRepository();
