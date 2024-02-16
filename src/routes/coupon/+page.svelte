<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  export let data;

  export let items = [];

  const { coupon: coupons, totalCouponCount } = data;

  let selectedOption = "code";

  let selectedCoupons = [];
  let isAllSelected = false;

  let showResult = false;

  $: pageNum = $page.url.searchParams.get("pageNum") || 1;

  const goCoupon = (coupon) => {
    goto(`/coupon/${coupon.id}`);
  };

  const searchAndShowResult = (value) => {
    window.location = `/coupon/search?option=${selectedOption}&value=${value}`;
  };

  const search = async (selectedOption, value) => {
    if (value.length > 0) {
      try {
        const params = { value };
        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(`/coupon/search?${queryString}&option=${selectedOption}`, {
          method: "GET",
        }).then((response) => response.json());
        items = response?.splice(0, 5) || [];
      } catch (error) {
        console.error("Error : coupon/search", error);
      }
    }
  };

  function toggleCouponSelection(idx) {
    if (selectedCoupons.includes(idx)) {
      selectedCoupons = selectedCoupons.filter((selectedIdx) => selectedIdx !== idx);
    } else {
      selectedCoupons = [...selectedCoupons, idx];
    }
  }

  function toggleSelectAll() {
    if (!isAllSelected) {
      selectedCoupons = coupons;
      isAllSelected = true;
    } else {
      selectedCoupons = [];
      isAllSelected = false;
    }
  }

  const deleteCoupons = async () => {
    if (selectedCoupons.length === 0) {
      alert("삭제할 쿠폰을 선택해주세요");
      return;
    }

    const response = await fetch("/coupon", {
      method: "DELETE",
      body: JSON.stringify(selectedCoupons),
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

<div class="mb-4 w-[700px]">
  <select bind:value={selectedOption} class="ml-4 mr-2">
    <option value="code">Code</option>
    <option value="user">User</option>
    <option value="goods">Goods</option>
  </select>
  <input
    class="mr-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
    placeholder="검색"
    on:input={async (e) => {
      if (e.target.value.length > 1) await search(selectedOption, e.target.value);
      else items = [];
      showResult = false;
    }}
    on:keydown={async (e) => {
      if (e.key === "Enter") {
        await searchAndShowResult(e.target.value);
        showResult = true;
      }
    }} />
  <ul class="dropdown-content z-50 mb-4 w-full rounded-lg bg-base-100 shadow">
    <li>
      {#each items as item}
        <a href="/coupon/{item.id}">
          <p class="text-body2 py-4 pl-8 hover:bg-gray-200">{item.code}</p>
        </a>
      {/each}
    </li>
  </ul>
  <button
    type="button"
    class="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
    >Search</button>
  <button
    type="button"
    class="ml-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
    on:click={() => goto("/coupon/new")}>Coupon Create</button>

  <button
    type="button"
    class="ml-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
    on:click={deleteCoupons}>Coupon Delete</button>
</div>

<div class="overflow-x-auto">
  <table class="table">
    <thead>
      <tr>
        <th>
          <input type="checkbox" checked={isAllSelected} on:change={toggleSelectAll} />
        </th>
        <th>Coupon Code</th>
        <th>User</th>
        <th>Goods</th>
        <th>Price</th>
        <th>CreatedAt</th>
      </tr>
    </thead>
    <tbody>
      {#each coupons as coupon}
        <tr class="hover:bg-gray-200">
          <td>
            <input
              on:click={() => toggleCouponSelection(coupon)}
              type="checkbox"
              checked={selectedCoupons.some((selectedCoupon) => selectedCoupon.id === coupon.id)} />
          </td>
          <td on:click={() => goCoupon(coupon)}>{coupon.code}</td>
          <td on:click={() => goCoupon(coupon)}>{coupon.user?.nickname || ""}</td>
          <td on:click={() => goCoupon(coupon)}>{coupon.goods?.name}</td>
          <td on:click={() => goCoupon(coupon)}>{coupon.goods?.price}</td>
          <td on:click={() => goCoupon(coupon)}
            >{coupon.createdAt ? new Date(coupon.createdAt).toLocaleString() : ""}</td>
        </tr>
      {/each}
    </tbody>
  </table>

  {#if totalCouponCount > 0 && !isNaN(Number(pageNum))}
    <div class="my-3 flex w-full justify-center gap-4">
      <button
        type="button"
        class="mr-4 cursor-pointer"
        disabled={Number(pageNum) === 1}
        on:click={() => {
          window.location.href = `/coupon?pageNum=1`;
        }}>«</button>
      {#if Number(pageNum) !== 1}
        <button
          type="button"
          on:click={() => {
            window.location.href = `/coupon?pageNum=${Number(pageNum) - 1}`;
          }}>{Number(pageNum) - 1}</button>
      {/if}
      <button class="font-bold text-primary underline">{Number(pageNum)}</button>
      {#if Number(pageNum) < Math.ceil(totalCouponCount / 20)}
        <button
          type="button"
          on:click={() => {
            window.location.href = `/coupon?pageNum=${Number(pageNum) + 1}`;
          }}>{Number(pageNum) + 1}</button>
      {/if}
      <button
        class="ml-4 cursor-pointer"
        disabled={Number(pageNum) >= Math.ceil(totalCouponCount / 20)}
        on:click={() => {
          window.location.href = `/coupon?pageNum=${Math.ceil(totalCouponCount / 20)}`;
        }}>»</button>
    </div>
  {/if}
</div>

<style>
  .dropdown-content {
    position: fixed;
    background-color: white;
  }

  .dropdown-content li {
    background-color: white; /* 아이템의 배경색을 원하는 색상으로 설정하세요 */
  }
</style>
