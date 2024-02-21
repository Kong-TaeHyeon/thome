<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  export let data;

  const { contacts, count: totalContactCount } = data;

  let selectedStatus;

  $: pageNum = $page.url.searchParams.get("pageNum") || 1;

  onMount(() => {
    selectedStatus = $page.url.searchParams.get("filter") || "all";
  });
</script>

<!-- 페이지네이션, 삭제, 상세 조회 -->

<table class="table">
  <thead>
    <tr>
      <th>CreatedAt</th>
      <th>Type</th>
      <th>Title</th>
      <th>User</th>
      <th>
        <select
          bind:value={selectedStatus}
          on:change={() => {
            window.location.href = `/contact?filter=${selectedStatus}`;
          }}>
          <option value="all">Status (All)</option>
          <option value="COMPLETED">Status (Completed)</option>
          <option value="PENDING">Status (Pending)</option>
          <option value="ISSUE">Status (ISSUE)</option>
        </select>
      </th>
      <th>Respondent</th>
    </tr>
  </thead>

  <tbody>
    {#each contacts as contact, idx}
      <tr class="hover:bg-gray-200" on:click={() => goto(`/contact/${contact.id}`)}>
        <td>{contact.createdAt ? new Date(contact.createdAt).toLocaleString() : ""}</td>
        <td>{contact.type}</td>
        <td> {contact.title} </td>
        <td>{contact.user.nickname}</td>
        <td> {contact.status} </td>
        <td> {contact.respondent || "미정"} </td>
      </tr>
    {/each}
  </tbody>
</table>

{#if totalContactCount > 0 && !isNaN(Number(pageNum))}
  <div class="my-3 flex w-full justify-center gap-4">
    <button
      type="button"
      class="mr-4 cursor-pointer"
      disabled={Number(pageNum) === 1}
      on:click={() => {
        window.location.href = `/contact?pageNum=1&filter=${selectedStatus}`;
      }}>«</button>
    {#if Number(pageNum) !== 1}
      <button
        type="button"
        on:click={() => {
          window.location.href = `/contact?pageNum=${Number(pageNum) - 1}&filter=${selectedStatus}`;
        }}>{Number(pageNum) - 1}</button>
    {/if}
    <button class="font-bold text-primary underline">{Number(pageNum)}</button>
    {#if Number(pageNum) < Math.ceil(totalContactCount / 20)}
      <button
        type="button"
        on:click={() => {
          window.location.href = `/contact?pageNum=${Number(pageNum) + 1}&filter=${selectedStatus}`;
        }}>{Number(pageNum) + 1}</button>
    {/if}
    <button
      class="ml-4 cursor-pointer"
      disabled={Number(pageNum) >= Math.ceil(totalContactCount / 20)}
      on:click={() => {
        window.location.href = `/contact?pageNum=${Math.ceil(totalContactCount / 20)}&filter=${selectedStatus}`;
      }}>»</button>
  </div>
{/if}
