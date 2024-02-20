<script>
  import { enhance } from "$app/forms";
  import "../app.pcss";

  export let data;
  let { userRole } = data;

  let isOpen = false;

  function toggleDropdown() {
    isOpen = !isOpen;
  }

  const handleLogout = async () => {
    const response = await fetch("/auth");
    const data = await response.json();

    if (data === "logout") {
      alert("로그아웃 성공");
      window.location.reload();
    }
  };
</script>

<!-- 네비게이션 바 -->
<nav class="mb-2 bg-gray-800 py-2">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex h-16 items-center justify-between">
      <div class="flex-shrink-0">
        <a href="/" class="text-2xl font-bold text-white">Thome</a>
      </div>
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="flex">
        <a
          href="/user"
          class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">회원</a>

        <!-- Dropdown menu for Product, Program, and Coupon -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="relative" on:click={toggleDropdown}>
          <button
            class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring">
            제품
            <!-- Arrow icon -->
            <svg class="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M10 12a1 1 0 0 1-.707-.293l-5-5a1 1 0 1 1 1.414-1.414L10 9.586l4.293-4.293a1 1 0 1 1 1.414 1.414l-5 5A1 1 0 0 1 10 12z"
                clip-rule="evenodd" />
            </svg>
          </button>
          <!-- Dropdown panel -->
          {#if isOpen}
            <div class="absolute z-10 mt-2 w-32 rounded-md bg-gray-800 shadow-lg">
              <a
                href="/product"
                class="block px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">상품</a>
              <a
                href="/program"
                class="block px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >프로그램</a>
              <a
                href="/coupon"
                class="block px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">쿠폰</a>
            </div>
          {/if}
        </div>

        <a
          href="/news"
          class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">뉴스</a>
        <a
          href="/contact"
          class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">1:1 문의</a>
        {#if userRole === "ADMIN"}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div
            on:click={handleLogout}
            class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
            로그아웃
          </div>
        {/if}
      </div>
    </div>
  </div>
</nav>

<slot />
