<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  export let data;
  const { news } = data;

  const handleUpdateNews = async () => {
    let response = await fetch("/news", {
      method: "POST",
      body: JSON.stringify(news),
      headers: {
        "content-type": "application/json",
      },
    });

    response = await response.json();

    if (response) {
      alert("수정되었습니다.");
      goto("/news");
    }
  };
</script>

<div class="mt-20 items-center justify-center">
  <div class="mx-auto max-w-lg rounded-lg bg-white p-4 shadow-lg">
    <div class="flex flex-col">
      <p class="mb-2 text-lg font-bold">제목</p>
      <textarea class="w-full border-2 text-lg font-bold" bind:value={news.title} />
    </div>

    <div class="mb-4">
      <p class="mb-2 font-bold">내용</p>
      <textarea class="w-full border-4" bind:value={news.content} />
    </div>

    <p class="mb-4">작성 시간: {news.createdAt ? new Date(news.createdAt).toLocaleString() : ""}</p>
    <div class="mb-4 border-b border-gray-300" />

    <div class="flex justify-between">
      <button
        class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
        on:click={() => {
          goto("/news");
        }}>목록 보기</button>
      <button
        class="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:bg-blue-600 focus:outline-none"
        on:click={() => {
          handleUpdateNews();
        }}>수정 하기</button>
    </div>
  </div>
</div>
