<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  export let data;

  const { contacts } = data;

  let selectedStatus;

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
        </select>
      </th>
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
      </tr>
    {/each}
  </tbody>
</table>
