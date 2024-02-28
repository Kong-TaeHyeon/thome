import { supabase } from "../supabaseClient";

class ActsRepository {
  async insertAct({ act }) {
    const { error } = await supabase.from("act").insert({ ...act });

    if (error) throw new Error(error.message);

    return;
  }

  async fetchActByProgramId({ programId }) {
    const { data: acts, error } = await supabase.from("act").select("*").eq("programId", programId);

    if (error) throw new Error(error.message);

    return { acts };
  }

  async deleteActById({ actId }) {
    const { data: deletedAct, error } = await supabase.from("act").delete().eq("id", actId).select();
    if (error) throw new Error(error.message);

    return { deletedAct };
  }

  // 현재 Table 설정이 Cascade.
  //   async deleteActByProgramId({ programId }) {
  //     const { error } = await supabase.from("act").delete().eq("programId", programId);
  //     if (error) throw new Error(error.message);
  //   }

  async updateOrder({ programId, standardOrder }) {
    const { data: acts, error: fetchErr } = await supabase.from("act").select("*").eq("programId", programId);

    acts.forEach((act) => {
      if (act.order > standardOrder) {
        act.order = act.order - 1;
      }
    });

    const { error: upsertErr } = await supabase.from("act").upsert(acts);

    if (fetchErr) throw new Error(fetchErr.message);
    if (upsertErr) throw new Error(upsertErr.message);
    return;
  }
}

export default new ActsRepository();
