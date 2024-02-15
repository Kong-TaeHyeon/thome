<script>
  export let data;

  let { coupon } = data;
  let user = coupon.user;
  let goods = coupon.goods;
</script>

<div class="flex flex-col items-center justify-center p-4">
  <div class="mb-4 h-[200px] w-[800px] items-center justify-center">
    <p class="mb-4 text-lg font-bold">Coupon</p>

    <p>Code: <input bind:value={coupon.code} /></p>
    <p>Created: {coupon.createdAt ? new Date(coupon.createdAt).toLocaleString() : ""}</p>
  </div>

  <div class="mb-8 h-[200px] w-[800px] items-center justify-center">
    <p class="mb-4 text-lg font-bold">User</p>

    <div class="mb-2 flex items-center">
      {#if user?.profileImageUrl}
        <img class="mr-2 h-12 w-12 rounded-full" alt="profile" src={user?.profileImageUrl} />
      {/if}
      <p>Nickname : {user?.nickname || ""}</p>
    </div>
    <p>Email: {user?.email || ""}</p>
  </div>

  <div class="mb-8 h-[200px] w-[800px] items-center justify-center">
    <p class="mb-2 text-lg font-bold">Goods</p>
    <div class="mb-2">
      <p>Goods Name: {goods?.name}</p>
    </div>
    <p>Goods Description: {goods?.description}</p>
  </div>
</div>
