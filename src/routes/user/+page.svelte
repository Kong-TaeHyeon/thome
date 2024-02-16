<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { json } from "@sveltejs/kit";
  import { utils, writeFile } from "xlsx";

  export let data;
  const { users, totalUserCount } = data;

  $: pageNum = $page.url.searchParams.get("pageNum") || 1;

  let selectedUsers = [];
  let isAllSelected = false;

  const goUser = (userId) => {
    goto(`/user/${userId}`);
  };

  const allUserDownload = async () => {
    const data = [["NickName", "Email", "BirthDay", "Gender", "SkinType", "Thome Index", "DN", "Quiz"]];

    const response = await fetch("/user");
    const users = await response.json();

    users.forEach((user) => {
      if (user.point.length === 0) {
        const arr = [
          user.nickname,
          user.email,
          user.birthday,
          user.gender,
          user.skinType,
          user.thomeIndex,
          0,
          user.isQuizCompleted,
        ];

        data.push(arr);
      } else {
        const arr = [
          user.nickname,
          user.email,
          user.birthday,
          user.gender,
          user.skinType,
          user.thomeIndex,
          user.point.reduce((acc, cur) => (acc += cur.point), 0),
          user.isQuizCompleted,
        ];
        data.push(arr);
      }
    });

    const ws = utils.aoa_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Sheet1");

    writeFile(wb, "data.xlsx");
  };

  const selectedUserDownload = async () => {
    const data = [["NickName", "Email", "BirthDay", "Gender", "SkinType", "Thome Index", "DN", "Quiz"]];

    selectedUsers.forEach((user) => {
      const arr = [
        user.nickname,
        user.email,
        user.birthday,
        user.gender,
        user.skinType,
        user.thomeIndex,
        user.point.reduce((acc, cur) => (acc += cur.point), 0),
        user.isQuizCompleted,
      ];

      data.push(arr);
    });

    const ws = utils.aoa_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Sheet1");

    writeFile(wb, "data.xlsx");
  };

  function toggleUserSelection(idx) {
    if (selectedUsers.includes(idx)) {
      selectedUsers = selectedUsers.filter((selectedIdx) => selectedIdx !== idx);
    } else {
      selectedUsers = [...selectedUsers, idx];
    }
  }

  function toggleSelectAll() {
    if (!isAllSelected) {
      selectedUsers = users;
      isAllSelected = true;
    } else {
      selectedUsers = [];
      isAllSelected = false;
    }
  }
</script>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
  <div
    class="flex-column flex flex-wrap items-center justify-between space-y-4 bg-white pb-4 md:flex-row md:space-y-0 dark:bg-gray-900">
    <label for="table-search" class="sr-only">Search</label>
    <div class="relative">
      <div class="rtl:inset-r-0 pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3"></div>
    </div>
  </div>
  <table class="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
    <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="p-4">
          <div class="flex items-center">
            <input
              checked={isAllSelected}
              on:change={toggleSelectAll}
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800" />
          </div>
        </th>
        <th scope="col" class="px-6 py-3"> Index </th>
        <th scope="col" class="px-6 py-3"> User </th>
        <th scope="col" class="px-6 py-3"> BirthDay </th>
        <th scope="col" class="px-6 py-3"> Gender </th>
        <th scope="col" class="px-6 py-3"> Skin Type </th>
        <th scope="col" class="px-6 py-3"> Thome Index </th>
        <th scope="col" class="px-6 py-3"> DN </th>
        <th scope="col" class="px-6 py-3"> Quiz </th>
      </tr>
    </thead>
    <tbody>
      {#each users as user, idx}
        <tr class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
          <td class="w-4 p-4">
            <div class="flex items-center">
              <input
                on:click={() => toggleUserSelection(user)}
                checked={selectedUsers.some((selectedUser) => selectedUser.id === user.id)}
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800" />
            </div>
          </td>
          <td class="px-6 py-4"> {20 * (pageNum - 1) + idx + 1} </td>
          <th
            on:click={() => goUser(user.id)}
            scope="row"
            class="flex items-center whitespace-nowrap px-6 py-4 text-gray-900 dark:text-white">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <img
              on:click={() => goUser(user.id)}
              class="h-10 w-10 rounded-full"
              src={user.profileImageUrl}
              alt="profile" />
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div on:click={() => goUser(user.id)} class="ps-3">
              <div class="text-base font-semibold">{user.nickname}</div>
              <div class="font-normal text-gray-500">{user.email}</div>
            </div>
          </th>

          <td on:click={() => goUser(user.id)} class="px-6 py-4"> {user.birthday || ""} </td>
          <td on:click={() => goUser(user.id)} class="px-6 py-4"> {user.gender || ""} </td>
          <td on:click={() => goUser(user.id)} class="px-6 py-4"> {user.skinType || ""} </td>
          <td on:click={() => goUser(user.id)} class="px-6 py-4"> {user.thomeIndex || ""} </td>

          {#if user.point.length !== 0}
            <td class="px-6 py-4"> {user.point.reduce((acc, cur) => (acc += cur.point), 0)} </td>
          {:else}
            <td class="px-6 py-4"> 0 </td>
          {/if}
          <td class="px-6 py-4"> {user.isQuizCompleted || ""} </td>
        </tr>
      {/each}
    </tbody>
  </table>

  {#if totalUserCount > 0 && !isNaN(Number(pageNum))}
    <div class="my-3 flex w-full justify-center gap-4">
      <button
        type="button"
        class="mr-4 cursor-pointer"
        disabled={Number(pageNum) === 1}
        on:click={() => {
          let url = new URL($page.url.href);
          url.searchParams.set("pageNum", 1);
          return goto("/").then(() => {
            goto(url);
          });
        }}>«</button>
      {#if Number(pageNum) !== 1}
        <button
          type="button"
          on:click={() => {
            window.location.href = `/user?pageNum=${Number(pageNum) - 1}`;
          }}>{Number(pageNum) - 1}</button>
      {/if}
      <button class="font-bold text-primary underline">{Number(pageNum)}</button>
      {#if Number(pageNum) < Math.ceil(totalUserCount / 20)}
        <button
          type="button"
          on:click={() => {
            window.location.href = `/user?pageNum=${Number(pageNum) + 1}`;
          }}>{Number(pageNum) + 1}</button>
      {/if}
      <button
        class="ml-4 cursor-pointer"
        disabled={Number(pageNum) >= Math.ceil(totalUserCount / 20)}
        on:click={() => {
          window.location.href = `/user?pageNum=${Math.ceil(totalUserCount / 20)}`;
        }}>»</button>
    </div>
  {/if}

  <button
    on:click={selectedUserDownload}
    type="button"
    class="mb-2 me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
    >선택한 User Excel 파일 다운로드</button>
  <button
    on:click={allUserDownload}
    type="button"
    class="mb-2 me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
    >전체 User Excel 파일 다운로드</button>
</div>
