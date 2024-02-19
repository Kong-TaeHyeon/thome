<script>
  import { enhance } from "$app/forms";
  import "../app.pcss";

  export let data;
  let { userRole } = data;

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
      <div class="flex">
        <a
          href="/user"
          class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">회원</a>
        <a
          href="/product"
          class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">상품</a>
        <a
          href="/coupon"
          class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">쿠폰</a>
        <a
          href="/news"
          class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">뉴스</a>
        <a
          href="/contact"
          class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">1:1 문의</a>
        {#if userRole === "ADMIN"}
          <button
            on:click={handleLogout}
            class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >로그아웃</button>
        {/if}
      </div>
    </div>
  </div>
</nav>

<slot />
