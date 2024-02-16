import { supabase } from "../supabaseClient";

class NewsRepository {
  async fetchNewsByPaging({ pageNum = 1 }) {
    const page = (Number(pageNum) - 1) * 20;
    const { data: news, error: err } = await supabase
      .from("news")
      .select("*")
      .range(page, page + 19);

    if (err) throw new Error("fetch News Error : ", err.message);

    return { news };
  }

  async fetchTotalNewCount() {
    const { count: totalNewsCount, error } = await supabase.from("news").select("*", { count: "exact" });
    if (error) throw new Error(error.message);
    return { totalNewsCount };
  }

  async insertNews({ news }) {
    const { status, error } = await supabase.from("news").insert({ title: news.title, content: news.content });

    if (error) throw new Error(error.message);

    return { status };
  }

  async deleteNews(idList) {
    const { error } = await supabase.from("news").delete().in("id", idList);
    if (error) throw new Error(error.message);

    return true;
  }
}

export default new NewsRepository();
