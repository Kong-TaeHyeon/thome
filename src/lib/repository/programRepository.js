import { supabase } from "../supabaseClient";

class ProgramRepository {
  async fetchTotalProcutCount() {
    const { count, error } = await supabase.from("program").select("*", { count: "exact" });

    if (error) throw new Error(error.message);
    return count;
  }

  async fetchProgramByIds({ programIds }) {
    const { data: programPaths, error } = await supabase
      .from("program")
      .select("bannerImageFilePath, productImageFilePath, bannerComingSoonImageFilePath")
      .in("id", programIds);

    if (error) throw new Error(error.message);

    return { programPaths };
  }

  async fetchProgramById({ programId }) {
    if (programId === "undefined") return { program: {} };

    const { data: program, error } = await supabase
      .from("program")
      .select("*, product(*), act(*)")
      .eq("id", programId)
      .order("createdAt", {
        foreignTable: "act",
        ascending: true,
      })
      .maybeSingle();

    if (error) throw new Error(error.message);

    return { program };
  }

  async fetchProgramByPaging({ pageNum = 1 }) {
    let page = (Number(pageNum) - 1) * 20;

    if (page < 0) page = 0;

    const { data: programs, error } = await supabase
      .from("program")
      .select("*")
      .is("deletedAt", null)
      .order("createdAt", { ascending: false })
      .range(page, page + 19);

    if (error) throw new Error(error.message);

    return { programs };
  }

  async deleteProgramById({ programId }) {
    let date = new Date();
    const { error } = await supabase.from("program").update({ deletedAt: date.toISOString() }).in("id", programId);

    if (error) throw new Error(error.message);
  }

  async fetchActPathByProgramId({ programIds }) {
    const { data: actPaths, error } = await supabase.from("program").select("act(*)").in("id", programIds);
    if (error) throw new Error(error.message);
    return { actPaths };
  }
}

export default new ProgramRepository();
