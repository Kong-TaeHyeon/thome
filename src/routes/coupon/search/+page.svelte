<script>
  import { goto } from "$app/navigation";

  export let data;

  const { coupons } = data;

  const goCoupon = (coupon) => {
    goto(`/coupon/${coupon.id}`);
  };
</script>

<div class="overflow-x-auto">
  <table class="table">
    <thead>
      <tr>
        <th>Coupon Code</th>
        <th>User</th>
        <th>Goods</th>
        <th>CreatedAt</th>
      </tr>
    </thead>
    <tbody>
      {#if coupons?.length > 0}
        {#each coupons as coupon, idx}
          <tr class="hover:bg-gray-200" on:click={() => goCoupon(coupon)}>
            <td>{coupon.code}</td>
            <td>{coupon.user?.nickname || ""}</td>
            <td>{coupon.goods?.name || ""}</td>
            <td>{coupon.createdAt ? new Date(coupon.createdAt).toLocaleString() : ""}</td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</div>
