<script>
  import { enhance } from "$app/forms";

  let option = "email";
  let showResult = false;
  let items = [];

  let selectedGoods;
  let code;

  const searchGoods = async (name) => {
    if (name.length > 0) {
      try {
        const params = { name };
        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(`/coupon/new?${queryString}`, {
          method: "GET",
        }).then((response) => response.json());

        items = response?.splice(0, 5) || [];
      } catch (error) {
        console.error("Error : coupon/search", error);
      }
    }
  };

  const submitForm = async ({ formData, cancel }) => {
    if (selectedGoods === undefined) {
      alert("굿즈를 선택해주세요");
      cancel();
      return;
    }

    formData.append("code", code);
    formData.append("goods", selectedGoods.id);

    return async ({ result }) => {
      if (result.type === "success") {
        if (result.data === "fail") {
          alert("쿠폰 코드가 중복되었습니다.");
        } else alert("쿠폰이 등록되었습니다.");
      } else {
        alert("오류가 발생했습니다.");
      }
    };
  };
</script>

<div class="flex flex-col items-center justify-center">
  <div class="mt-4 flex w-[600px] flex-col items-center justify-center">
    <div class="mb-4 text-lg font-bold">Coupon Create</div>
    <form
      method="post"
      action="?/save"
      use:enhance={submitForm}
      class="flex w-[600px] flex-col items-center justify-center">
      <div>Code</div>
      <input type="text" bind:value={code} placeholder="Type Code" class="input input-bordered mb-4 w-full max-w-xs" />
      <div>Goods</div>
      <input
        type="text"
        placeholder="Search Goods"
        class="input input-bordered mb-4 w-full max-w-xs"
        value={selectedGoods?.name || ""}
        on:input={async (e) => {
          if (e.target.value.length > 1) await searchGoods(e.target.value);
          else items = [];
          showResult = false;
        }}
        on:keydown={async (e) => {
          if (e.key === "Enter") {
            showResult = true;
          }
        }} />
      {#if showResult == false}
        <ul class="dropdown-content z-50 mb-4 w-full rounded-lg bg-base-100 shadow">
          <li>
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            {#each items as item}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <div
                on:click={() => {
                  selectedGoods = item;
                  showResult = true;
                }}>
                <p class="text-body2 py-4 pl-8 hover:bg-gray-200">{item.name}</p>
              </div>
            {/each}
          </li>
        </ul>
      {/if}
      <button
        formaction="?/save"
        class="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
        >Create</button>
    </form>
  </div>
</div>

<style>
  .dropdown-content {
    background-color: white;
  }

  .dropdown-content li {
    background-color: white; /* 아이템의 배경색을 원하는 색상으로 설정하세요 */
  }
</style>
