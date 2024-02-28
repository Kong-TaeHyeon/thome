import { supabase } from "../supabaseClient";

class StorageRepository {
  // Upload (or Update) File

  getFileExtension(filename) {
    // 파일명에서 마지막 점(.)의 인덱스를 찾습니다.
    const lastIndex = filename.lastIndexOf(".");
    if (lastIndex === -1) {
      return ""; // 확장자가 없는 경우 빈 문자열을 반환합니다.
    }
    // 마지막 점(.) 이후의 문자열을 반환합니다.
    return filename.substring(lastIndex + 1);
  }

  async deleteFile({ imagePath }) {
    if (imagePath.length === 0) return;
    try {
      const { error } = await supabase.storage.from("program-images").remove(imagePath);

      if (error) {
        console.error(error);
        throw new Error(error.message);
      }
    } catch (err) {
      console.error(err.message);
      throw new Error(err.message);
    }
  }

  async uploadFile({ file, category }) {
    const now = new Date();
    const timestamp = now.toISOString().replace(/[-:.]/g, "");
    const fileName = timestamp + "." + this.getFileExtension(file.name);

    const { data, error } = await supabase.storage.from("program-images").upload(`${category}/${fileName}`, file, {
      cacheControl: "3600",
      upsert: true,
    });

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }

    let { data: imageUrl } = supabase.storage.from("program-images").getPublicUrl(data.path);
    return { imageUrl, imagePath: data.path };
  }
}

export default new StorageRepository();
