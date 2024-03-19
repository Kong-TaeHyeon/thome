<script>
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  export let data;
  const { products, count: totalProductCount } = data;

  $: pageNum = $page.url.searchParams.get("pageNum") || 1;
  let selectedProducts = [];
  let isAllSelected = false;

  const toggleProductSelection = (idx) => {
    if (selectedProducts.includes(idx)) {
      selectedProducts = selectedProducts.filter((selectedIdx) => selectedIdx !== idx);
    } else {
      selectedProducts = [...selectedProducts, idx];
    }
  };

  function toggleSelectAll() {
    if (!isAllSelected) {
      selectedProducts = products;
      isAllSelected = true;
    } else {
      selectedProducts = [];
      isAllSelected = false;
    }
  }

  const handleDelete = async () => {
    if (selectedProducts.length === 0) {
      alert("삭제할 쿠폰을 선택해주세요");
      return;
    }

    const response = await fetch("/product", {
      method: "DELETE",
      body: JSON.stringify(selectedProducts),
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
            <label for="checkbox-all-search" class="sr-only">checkbox</label>
          </div>
        </th>
        <th scope="col" class="px-6 py-3"> Index </th>
        <th scope="col" class="px-6 py-3"> Image </th>
        <th scope="col" class="px-6 py-3"> Name </th>
        <th scope="col" class="px-6 py-3"> Ingredient </th>
        <th scope="col" class="px-6 py-3"> Description </th>
        <th scope="col" class="px-6 py-3"> Feature </th>
        <th scope="col" class="px-6 py-3"> Link </th>
      </tr>
    </thead>
    <tbody>
      {#each products as product, idx}
        <tr
          class=" cursor-pointer border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
          <td class="w-4 p-4">
            <div class="flex items-center">
              <input
                on:click={() => toggleProductSelection(product)}
                checked={selectedProducts.some((selectedProduct) => selectedProduct.id === product.id)}
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800" />
              <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
            </div>
          </td>
          <td class="px-6 py-4"> {idx + 1 + (pageNum - 1) * 20}</td>
          <th
            scope="row"
            on:click={() => goto(`/product/${product.id}`)}
            class="flex items-center whitespace-nowrap py-4 text-gray-900 dark:text-white">
            <img class="h-20 w-20 object-contain" src={product.imageUrl} alt="product" />
          </th>
          <td on:click={() => goto(`/product/${product.id}`)} class="px-6 py-4"> {product.name} </td>
          <td on:click={() => goto(`/product/${product.id}`)} class="px-6 py-4">
            <div class="flex items-center">
              {product.ingredient}
            </div>
          </td>
          <td on:click={() => goto(`/product/${product.id}`)} class="px-6 py-4">
            {product.description.substring(0, 30)}...
          </td>
          <td on:click={() => goto(`/product/${product.id}`)} class="overflow-hidden px-6 py-4">
            {product.feature.substring(0, 10)}...
          </td>
          <td on:click={() => goto(`/product/${product.id}`)} class="overflow-hidden px-6 py-4">
            <a href={product.shoppingUrl}> {product.shoppingUrl} </a>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  {#if totalProductCount > 0 && !isNaN(Number(pageNum))}
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
      {#if Number(pageNum) < Math.ceil(totalProductCount / 20)}
        <button
          type="button"
          on:click={() => {
            window.location.href = `/program?pageNum=${Number(pageNum) + 1}`;
          }}>{Number(pageNum) + 1}</button>
      {/if}
      <button
        class="ml-4 cursor-pointer"
        disabled={Number(pageNum) >= Math.ceil(totalProductCount / 20)}
        on:click={() => {
          window.location.href = `/program?pageNum=${Math.ceil(totalProductCount / 20)}`;
        }}>»</button>
    </div>
  {/if}

  <div class="mt-4 flex items-center justify-center">
    <button
      on:click={() => goto("/product/new")}
      type="button"
      class="mb-2 me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
      >상품 추가</button>
    <div>
      <button
        type="button"
        on:click={handleDelete}
        class="mb-2 me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        >선택한 상품 삭제</button>
    </div>
  </div>
</div>
