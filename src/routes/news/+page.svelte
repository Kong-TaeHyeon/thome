<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  export let data;

  const { news: newses, totalNewsCount } = data;
  let selectedNewses = [];
  let isAllSelected = false;

  const deleteNews = async () => {
    if (selectedNewses.length === 0) {
      alert("삭제할 쿠폰을 선택해주세요");
      return;
    }

    const response = await fetch("/news", {
      method: "DELETE",
      body: JSON.stringify(selectedNewses),
      headers: {
        "content-type": "application/json",
      },
    });

    let result = await response.json();
    if (result) {
      alert("삭제되었습니다.");
      window.location.reload();
    }
  };

  function toggleNewsSelection(idx) {
    if (selectedNewses.includes(idx)) {
      selectedNewses = selectedNewses.filter((selectedIdx) => selectedIdx !== idx);
    } else {
      selectedNewses = [...selectedNewses, idx];
    }
  }

  function toggleSelectAll() {
    if (!isAllSelected) {
      selectedNewses = newses;
      isAllSelected = true;
    } else {
      selectedNewses = [];
      isAllSelected = false;
    }
  }
  const pageNum = $page.url.searchParams.get("pageNum") || 1;
</script>

<table class="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
  <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
    <tr>
      <th scope="col" class="p-4">
        <div class="flex items-center">
          <input
            checked={isAllSelected}
            on:change={toggleSelectAll}
            type="checkbox"
            class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800" />
        </div>
      </th>
      <th scope="col" class="px-6 py-3"> Index </th>
      <th scope="col" class="px-6 py-3"> CreatedAt </th>
      <th scope="col" class="px-6 py-3"> Title </th>
    </tr>
  </thead>
  <tbody>
    {#each newses as news, idx}
      <tr
        class=" cursor-pointer border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
        <td class="w-4 p-4">
          <div class="flex items-center">
            <input
              on:click={() => toggleNewsSelection(news)}
              checked={selectedNewses.some((selectedNews) => selectedNews.id === news.id)}
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800" />
          </div>
        </td>
        <td class="px-6 py-4" on:click={() => goto(`news/${news.id}`)}> {20 * (pageNum - 1) + idx + 1} </td>

        <td class="px-6 py-4" on:click={() => goto(`news/${news.id}`)}> {news.createdAt} </td>
        <td class="px-6 py-4" on:click={() => goto(`news/${news.id}`)}> {news.title} </td>
      </tr>
    {/each}
  </tbody>
</table>

{#if totalNewsCount > 0 && !isNaN(Number(pageNum))}
  <div class="my-3 flex w-full justify-center gap-4">
    <button
      type="button"
      class="mr-4 cursor-pointer"
      disabled={Number(pageNum) === 1}
      on:click={() => {
        window.location.href = `/news?pageNum=1`;
      }}>«</button>
    {#if Number(pageNum) !== 1}
      <button
        type="button"
        on:click={() => {
          window.location.href = `/news?pageNum=${Number(pageNum) - 1}`;
        }}>{Number(pageNum) - 1}</button>
    {/if}
    <button class="font-bold text-primary underline">{Number(pageNum)}</button>
    {#if Number(pageNum) < Math.ceil(totalNewsCount / 20)}
      <button
        type="button"
        on:click={() => {
          window.location.href = `/news?pageNum=${Number(pageNum) + 1}`;
        }}>{Number(pageNum) + 1}</button>
    {/if}
    <button
      class="ml-4 cursor-pointer"
      disabled={Number(pageNum) >= Math.ceil(totalNewsCount / 20)}
      on:click={() => {
        window.location.href = `/news?pageNum=${Math.ceil(totalNewsCount / 20)}`;
      }}>»</button>
  </div>
{/if}

<button
  on:click={deleteNews}
  type="button"
  class="mb-2 me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
  >선택항목 삭제</button>

<button
  type="button"
  on:click={() => goto("news/new")}
  class="mb-2 me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
  >뉴스 등록</button>
