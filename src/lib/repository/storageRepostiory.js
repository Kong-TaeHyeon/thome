import { supabase } from "../supabaseClient";

class StorageRepository {
  async uploadImage({ file, folderPath }) {
    if (file === null) {
      return null;
    }

    const { data, error } = await supabase.storage.from("program-images").upload(`${folderPath}/${file.name}`, file, {
      cacheControl: "3600",
      upsert: true,
    });

    if (error) {
      console.error("Image Upload Error : ", error.message);
      return null;
    }

    let { data: imageUrl } = await supabase.storage.from("program-images").getPublicUrl(data.path);
    return imageUrl.publicUrl;
  }
}

// Promise All 을 위한 정의

export default new StorageRepository();
