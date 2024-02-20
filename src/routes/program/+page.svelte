<script>
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  export let data;
  const { programs, totalProgramCount } = data;

  let selectedPrograms = [];
  $: pageNum = $page.url.searchParams.get("pageNum") || 1;
  let isAllSelected = false;

  const toggleProgramSelection = (idx) => {
    if (selectedPrograms.includes(idx)) {
      selectedPrograms = selectedPrograms.filter((selectedIdx) => selectedIdx !== idx);
    } else {
      selectedPrograms = [...selectedPrograms, idx];
    }
  };

  function toggleSelectAll() {
    if (!isAllSelected) {
      selectedPrograms = programs;
      isAllSelected = true;
    } else {
      selectedPrograms = [];
      isAllSelected = false;
    }
  }

  const handleDelete = async ({ formData }) => {
    if (selectedPrograms.length === 0) {
      alert("삭제할 프로그램을 선택해주세요");
      return;
    }

    const response = await fetch("/program", {
      method: "DELETE",
      body: JSON.stringify(selectedPrograms),
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
</script>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table class="h-full w-full table-fixed text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
    <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="p-4">
          <div class="flex items-center">
            <input
              id="checkbox-all-search"
              checked={isAllSelected}
              on:change={toggleSelectAll}
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800" />
            <label for="checkbox-all-search" class="sr-only">checkbox</label>
          </div>
        </th>
        <th scope="col" class="px-6 py-3"> Index </th>
        <th scope="col" class="px-6 py-3"> Image </th>
        <th scope="col" class="px-6 py-3"> Name </th>
        <th scope="col" class="px-6 py-3"> InfoText </th>
      </tr>
    </thead>
    <tbody>
      {#each programs as program, idx}
        <tr class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
          <td class="w-4 p-4">
            <div class="flex items-center">
              <input
                on:click={() => toggleProgramSelection(program)}
                checked={selectedPrograms.some((selectedProgram) => selectedProgram.id === program.id)}
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800" />
              <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
            </div>
          </td>
          <td class="px-6 py-4"> {idx + 1} </td>
          <th
            scope="row"
            on:click={() => goto(`/program/${program.id}`)}
            class="flex items-center whitespace-nowrap py-4 text-gray-900 dark:text-white">
            <img class="object-fit h-20 w-20" src={program.bannerImageUrl} alt="product" />
          </th>
          <td on:click={() => goto(`/program/${program.id}`)} class="px-6 py-4"> {program.name} </td>
          <td on:click={() => goto(`/program/${program.id}`)} class="px-6 py-4">
            <div class="flex items-center">
              {program.infoText}
            </div>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  {#if totalProgramCount > 0 && !isNaN(Number(pageNum))}
    <div class="my-3 flex w-full justify-center gap-4">
      <button
        type="button"
        class="mr-4 cursor-pointer"
        disabled={Number(pageNum) === 1}
        on:click={() => {
          window.location.href = `/program?pageNum=1`;
        }}>«</button>
      {#if Number(pageNum) !== 1}
        <button
          type="button"
          on:click={() => {
            window.location.href = `/program?pageNum=${Number(pageNum) - 1}`;
          }}>{Number(pageNum) - 1}</button>
      {/if}
      <button class="font-bold text-primary underline">{Number(pageNum)}</button>
      {#if Number(pageNum) < Math.ceil(totalProgramCount / 20)}
        <button
          type="button"
          on:click={() => {
            window.location.href = `/program?pageNum=${Number(pageNum) + 1}`;
          }}>{Number(pageNum) + 1}</button>
      {/if}
      <button
        class="ml-4 cursor-pointer"
        disabled={Number(pageNum) >= Math.ceil(totalProgramCount / 20)}
        on:click={() => {
          window.location.href = `/program?pageNum=${Math.ceil(totalProgramCount / 20)}`;
        }}>»</button>
    </div>
  {/if}

  <div class="mt-4 flex items-center justify-center">
    <button
      on:click={() => goto("/program/null")}
      type="button"
      class="mb-2 me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
      >프로그램 추가</button>
    <form method="post" use:enhance={handleDelete} action="?/delete">
      <button
        type="submit"
        formaction="?/delete"
        class="mb-2 me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        >선택한 프로그램 삭제</button>
    </form>
  </div>
</div>
