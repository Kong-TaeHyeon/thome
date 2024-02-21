<script>
  export let data;

  const { admins } = data;

  let newAdmin = {
    email: "",
    name: "",
    password: "",
    role: "",
  };

  let isModalOpen = false;

  const openModal = () => {
    newAdmin = {
      email: "",
      name: "",
      password: "",
      role: "",
    };
    isModalOpen = true;
  };

  const closeModal = () => {
    isModalOpen = false;
  };

  let selectedAdmins = [];
  let isAllSelected = false;

  const addAdmin = async () => {
    const response = await fetch("/admin", {
      method: "POST",
      body: JSON.stringify(newAdmin),
      headers: {
        "content-type": "application/json",
      },
    });

    const result = await response.json();

    if (result) {
      alert("추가되었습니다.");
      window.location.reload();
    } else {
      alert("올바르게 입력해주세요. 또는 이메일 중복을 확인해주세요");
    }
  };

  const deletedAdmins = async () => {
    if (selectedAdmins.length === 0) {
      alert("삭제할 쿠폰을 선택해주세요");
      return;
    }

    const response = await fetch("/admin", {
      method: "DELETE",
      body: JSON.stringify(selectedAdmins),
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

  function toggleAdminSelection(idx) {
    if (selectedAdmins.includes(idx)) {
      selectedAdmins = selectedAdmins.filter((selectedIdx) => selectedIdx !== idx);
    } else {
      selectedAdmins = [...selectedAdmins, idx];
    }
  }

  function toggleSelectAll() {
    if (!isAllSelected) {
      selectedAdmins = admins;
      isAllSelected = true;
    } else {
      selectedAdmins = [];
      isAllSelected = false;
    }
  }
</script>

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
      <th scope="col" class="px-6 py-3"> CreatedAt </th>
      <th scope="col" class="px-6 py-3"> Email </th>
      <th scope="col" class="px-6 py-3"> Name </th>
      <th scope="col" class="px-6 py-3"> Role </th>
    </tr>
  </thead>
  <tbody>
    {#each admins as admin, idx}
      <tr class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
        <td class="w-4 p-4">
          <div class="flex items-center">
            <input
              on:click={() => toggleAdminSelection(admin)}
              checked={selectedAdmins.some((selectedAdmin) => selectedAdmin.id === admin.id)}
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800" />
          </div>
        </td>
        <td class="px-6 py-4"> {idx + 1} </td>

        <td class="px-6 py-4"> {admin.createdAt ? new Date(admin.createdAt).toLocaleString() : ""} </td>
        <td class="px-6 py-4"> {admin.email} </td>
        <td class="px-6 py-4"> {admin.name} </td>
        <td class="px-6 py-4"> {admin.role} </td>
      </tr>
    {/each}
  </tbody>
</table>
<div class="mt-4 flex flex-row items-center justify-center">
  <button
    on:click={deletedAdmins}
    type="button"
    class="me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
    >선택항목 삭제</button>

  <button
    type="button"
    on:click={openModal}
    class="me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
    >관리자 추가</button>
</div>
{#if isModalOpen}
  <div class="fixed inset-0 z-10 flex items-center justify-center">
    <div class="absolute inset-0 bg-gray-900 opacity-50"></div>
    <div class="z-20 w-[500px] rounded bg-white p-6 shadow-md">
      <h2 class="mb-4 text-lg font-semibold">관리자 추가</h2>
      <p class="w-full">이름</p>
      <input type="text" placeholder="Name" bind:value={newAdmin.name} class="mb-2 w-full rounded border p-2" />
      <p class="w-full">이메일</p>
      <input type="email" placeholder="Email" bind:value={newAdmin.email} class="mb-2 w-full rounded border p-2" />
      <p class="w-full">비밀번호</p>
      <input type="text" placeholder="Password" bind:value={newAdmin.password} class="mb-2 w-full rounded border p-2" />
      <p class="w-full">역할</p>
      <input type="text" placeholder="Role" bind:value={newAdmin.role} class="mb-2 w-full rounded border p-2" />

      <div class="mt-4 flex justify-end">
        <button class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600" on:click={addAdmin}>Save</button>
        <button class="ml-2 rounded bg-gray-400 px-4 py-2 text-white" on:click={closeModal}>Cancel</button>
      </div>
    </div>
  </div>
{/if}
