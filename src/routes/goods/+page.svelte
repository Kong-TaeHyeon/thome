<script>
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import GoodsComponent from "../../lib/component/GoodsComponent.svelte";

  export let data;
  let { goods, count: totalGoodsCount } = data;

  let aGoods;

  let isModalOpen = false;

  const closeModal = () => {
    isModalOpen = false;
  };

  // // 이걸 수정해야하겠다.
  // const addGoods = async () => {
  //   const response = await fetch("/goods", {
  //     body: JSON.stringify(aGoods),
  //   });
  // };

  const addGoods = (goods) => {
    aGoods = goods;
    isModalOpen = true;
  };

  const handleNewGoods = () => {
    aGoods = {
      title: "",
      description: "",
      price: 0,
      imageUrl: "",
    };

    isModalOpen = true;
  };

  const handleGoods = (goods) => {
    aGoods = goods;
    isModalOpen = true;
  };

  /**
   *
   */

  $: pageNum = $page.url.searchParams.get("pageNum") || 1;
  let selectedGoods = [];
  let isAllSelected = false;

  const toggleSelect = (idx) => {
    if (selectedGoods.includes(idx)) {
      selectedGoods = selectedGoods.filter((selectedIdx) => selectedIdx !== idx);
    } else {
      selectedGoods = [...selectedGoods, idx];
    }
  };

  function toggleSelectAll() {
    if (!isAllSelected) {
      selectedGoods = goods;
      isAllSelected = true;
    } else {
      selectedGoods = [];
      isAllSelected = false;
    }
  }

  const handleDelete = async () => {
    if (selectedGoods.length === 0) {
      alert("삭제할 쿠폰을 선택해주세요");
      return;
    }

    const response = await fetch("/goods", {
      method: "DELETE",
      body: JSON.stringify(selectedGoods),
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
  <table class="w-full table-fixed text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
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
          </div>
        </th>
        <th scope="col" class="px-6 py-3"> Index </th>
        <th scope="col" class="px-6 py-3"> Image </th>
        <th scope="col" class="px-6 py-3"> Name </th>
        <th scope="col" class="px-6 py-3"> Price </th>
        <th scope="col" class="px-6 py-3"> Description </th>
      </tr>
    </thead>
    <tbody>
      {#each goods as good, idx}
        <tr class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
          <td class="w-4 p-4">
            <div class="flex items-center">
              <input
                on:click={() => toggleSelect(good)}
                checked={selectedGoods.some((selectedGood) => selectedGood.id === good.id)}
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800" />
            </div>
          </td>
          <td class="px-6 py-4"> {idx + 1 + (pageNum - 1) * 20} </td>
          <th
            scope="row"
            on:click={() => handleGoods(good)}
            class="flex items-center whitespace-nowrap py-4 text-gray-900 dark:text-white">
            <img class="h-20 w-20 object-contain" src={good.imageUrl} alt="good" />
          </th>
          <td on:click={() => handleGoods(good)} class="px-6 py-4"> {good.name} </td>
          <td on:click={() => handleGoods(good)} class="px-6 py-4"> {good.price} </td>
          <td on:click={() => handleGoods(good)} class="px-6 py-4">
            {good.description}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  {#if totalGoodsCount > 0 && !isNaN(Number(pageNum))}
    <div class="my-3 flex w-full justify-center gap-4">
      <button
        type="button"
        class="mr-4 cursor-pointer"
        disabled={Number(pageNum) === 1}
        on:click={() => {
          window.location.href = `/goods?pageNum=1`;
        }}>«</button>
      {#if Number(pageNum) !== 1}
        <button
          type="button"
          on:click={() => {
            window.location.href = `/goods?pageNum=${Number(pageNum) - 1}`;
          }}>{Number(pageNum) - 1}</button>
      {/if}
      <button class="font-bold text-primary underline">{Number(pageNum)}</button>
      {#if Number(pageNum) < Math.ceil(totalGoodsCount / 20)}
        <button
          type="button"
          on:click={() => {
            window.location.href = `/goods?pageNum=${Number(pageNum) + 1}`;
          }}>{Number(pageNum) + 1}</button>
      {/if}
      <button
        class="ml-4 cursor-pointer"
        disabled={Number(pageNum) >= Math.ceil(totalGoodsCount / 20)}
        on:click={() => {
          window.location.href = `/goods?pageNum=${Math.ceil(totalGoodsCount / 20)}`;
        }}>»</button>
    </div>
  {/if}

  <div class="mt-4 flex items-center justify-center">
    <button
      on:click={handleNewGoods}
      type="button"
      class="mb-2 me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
      >굿즈 추가</button>
    <div>
      <button
        type="button"
        on:click={handleDelete}
        class="mb-2 me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        >선택한 굿즈 삭제</button>
    </div>
  </div>
</div>

<GoodsComponent {isModalOpen} goods={aGoods} {closeModal} />
