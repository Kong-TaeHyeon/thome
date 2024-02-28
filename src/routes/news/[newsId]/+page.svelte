<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  export let data;
  const { news } = data;

  const path = $page.url.pathname;
</script>

<div class="mt-20 items-center justify-center">
  <div class="mx-auto max-w-lg rounded-lg bg-white p-4 shadow-lg">
    <h2 class="mb-2 text-lg font-bold">제목: {news.title}</h2>

    <div class="mb-4">
      <p class="mb-2 font-bold">내용</p>
      <p>{news.content}</p>
    </div>

    <p class="mb-4">작성 시간: {news.createdAt ? new Date(news.createdAt).toLocaleString() : ""}</p>

    <div class="mb-4 border-b border-gray-300" />

    <div class="flex justify-between">
      <button
        class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
        on:click={() => {
          history.back();
        }}>목록 보기</button>
      <button
        class="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:bg-blue-600 focus:outline-none"
        on:click={() => {
          goto(`${path}/modify`);
        }}>수정 하기</button>
    </div>
  </div>
</div>
