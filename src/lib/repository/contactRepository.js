import { supabase } from "../supabaseClient";

class ContactRepository {
  async fetchContact() {
    const { data: contacts } = await supabase
      .from("contact")
      .select("*, user(*)")
      .order("createdAt", { ascending: false });

    return contacts;
  }

  async fetchContactById(id) {
    const { data: contact, error } = await supabase.from("contact").select("*, user(*)").eq("id", id).maybeSingle();

    if (error) throw new Error(error.message);

    return contact;
  }

  async fetchContactByOption(filter) {
    if (filter === "all") {
      return await this.fetchContact();
    }
    const { data: contacts, error } = await supabase
      .from("contact")
      .select("*, user(*)")
      .eq("status", filter)
      .order("createdAt", { ascending: false });

    if (error) throw new Error(error.message);

    return contacts;
  }

  async updateContact({ contact }) {
    const { answer, status, respondent } = contact;

    const { status: stat, error } = await supabase
      .from("contact")
      .update({ answer, status, respondent })
      .eq("id", contact.id);

    if (error) throw new Error(error.message);
  }

  // 이번주 / 일주일
  async fetchContactBundle() {
    let date = new Date();

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    // 일주일 전 날짜
    let aWeekAgo = new Date(year, month, day - 7);

    // 한달 전 날짜
    let aMonthAgo = new Date(year, month - 1, day);

    // 최근 일주일간 문의
    const { count: weekContact, error: err1 } = await supabase
      .from("contact")
      .select("*", { count: "exact" })
      .lte("createdAt", date.toISOString())
      .gte("createdAt", aWeekAgo.toISOString());

    if (err1) throw new Error(err1.message);

    // 최근 한달간 문의.
    const { count: monthContact, error: err2 } = await supabase
      .from("contact")
      .select("*", { count: "exact" })
      .lte("createdAt", date.toISOString())
      .gte("createdAt", aMonthAgo.toISOString());

    if (err2) throw new Error(err2.message);

    // 미완료한 문의
    const { count: pendingContact, error: err3 } = await supabase
      .from("contact")
      .select("*", { count: "exact" })
      .eq("status", "PENDING");

    if (err3) throw new Error(err3.message);

    // 미완료한 문의
    const { count: issueContact, error: err4 } = await supabase
      .from("contact")
      .select("*", { count: "exact" })
      .eq("status", "ISSUE");
    if (err3) throw new Error(err3.message);

    return { weekContact, monthContact, pendingContact, issueContact };
  }
}

export default new ContactRepository();
