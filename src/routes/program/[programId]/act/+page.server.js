import programRepository from "../../../../lib/repository/programRepository.js";
import { supabase } from "../../../../lib/supabaseClient.js";

export const load = async ({ params }) => {
  const programId = params.programId;

  if (programId === "null") {
    const program = {};
    return { program };
  }

  const { program } = await programRepository.fetchProgramById({ programId });

  return { program };
};

export const actions = {
  save: async ({ request, params }) => {
    const acts = await request.formData();

    const actList = [];
    const length = acts.get("length");

    for (let i = 0; i < length; i++) {
      let act = {};
      if (acts.get(`${i}imageFile`) !== null) {
        // 이미지를 업로드해야 하는 경우.
        const file = acts.get(`${i}imageFile`);
        const { data, error } = await supabase.storage
          .from("program-images")
          .upload(`img/${params.programId}/act/${i}+${file.name}`, file, {
            cacheControl: "3600",
            upsert: true,
          });

        if (error) throw new Error(error.message);

        let { data: imageUrl } = await supabase.storage.from("program-images").getPublicUrl(data.path);
        imageUrl = imageUrl.publicUrl;
        act.imageUrl = imageUrl;
      } else {
        act.imageUrl = acts.get(`${i}imageUrl`);
      }

      act.title = acts.get(`${i}title`);
      act.subTitle = acts.get(`${i}subTitle`);
      act.duration = acts.get(`${i}duration`);
      act.isOvertime = acts.get(`${i}isOvertime`);
      act.order = acts.get(`${i}order`);
      act.programId = params.programId;

      actList.push(act);
    }

    const { error: deleteErr } = await supabase.from("act").delete().eq("programId", params.programId);
    const { error: insertErr } = await supabase.from("act").insert(actList);

    console.log(insertErr);
    if (deleteErr) throw new Error(deleteErr.message);
    if (insertErr) throw new Error(insertErr.message);

    return "Success";
  },
};
