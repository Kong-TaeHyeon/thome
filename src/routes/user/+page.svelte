<script>
  export let data;
  const { users } = data;
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
              id="checkbox-all-search"
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800" />
            <label for="checkbox-all-search" class="sr-only">checkbox</label>
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
                id="checkbox-table-search-1"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800" />
              <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
            </div>
          </td>
          <td class="px-6 py-4"> {idx + 1} </td>
          <th scope="row" class="flex items-center whitespace-nowrap px-6 py-4 text-gray-900 dark:text-white">
            <img class="h-10 w-10 rounded-full" src={user.profileImageUrl} alt="Jese image" />
            <div class="ps-3">
              <div class="text-base font-semibold">{user.nickname}</div>
              <div class="font-normal text-gray-500">{user.email}</div>
            </div>
          </th>

          <td class="px-6 py-4"> {user.birthday || ""} </td>
          <td class="px-6 py-4"> {user.gender || ""} </td>
          <td class="px-6 py-4"> {user.skinType || ""} </td>
          <td class="px-6 py-4"> {user.thomeIndex || ""} </td>
          <td class="px-6 py-4"> 가져와야해! </td>
          <td class="px-6 py-4"> {user.isQuizCompleted || ""} </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
