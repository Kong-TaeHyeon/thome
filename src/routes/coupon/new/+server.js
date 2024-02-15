// 굿즈 검색용.
import { json } from "@sveltejs/kit";
import couponRepository from "../../../lib/repository/couponRepository.js";
import goodsRepository from "../../../lib/repository/goodsRepository.js";

export const GET = async ({ locals, url }) => {
  const name = url.searchParams.get("name");

  const goods = await goodsRepository.fetchGoodsByName(name);

  return json(goods);
};
