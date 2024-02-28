<script>
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  export let data;
  const { program } = data;

  let newAct = {
    title: "",
    subTitle: "",
    imageUrl: "",
    imageFile: "",
    duration: "",
    isOvertime: false,
    programId: program.id,
  };
  let isModalOpen = false;
  let newActionImage = false;

  function openModal() {
    isModalOpen = true;
  }

  function closeModal() {
    isModalOpen = false;
  }

  function handleImageUpload(event) {
    newAct.imageFile = event.target.files[0];
    newAct.imageUrl = URL.createObjectURL(event.target.files[0]);
  }

  async function addProgram({ formData, cancel }) {
    if (newAct.title === "" || newAct.subTitle === "" || newAct.duration === "") {
      alert("항목을 채워주세요.");
      return;
    }

    if (isNaN(newAct.duration) || newAct.duration === null) {
      alert("Duration : 정수");
      return;
    }

    formData.append(`title`, newAct.title);
    formData.append(`subTitle`, newAct.subTitle);
    formData.append(`duration`, newAct.duration);
    formData.append(`isOvertime`, newAct.isOvertime);
    formData.append(`order`, program.act.length);

    formData.append(`imageFile`, newAct.imageFile); // 이것이 이미지 파일

    return ({ result }) => {
      if (result.data === "success") {
        alert("추가 되었습니다.");
        window.location.reload();
      } else {
        alert("오류가 발생하였습니다.");
      }
    };
  }

  function addRow() {
    newAct = {
      title: "",
      subTitle: "",
      imageUrl: "",
      imageFile: "",
      duration: "",
      isOvertime: false,
      programId: program.id,
    };
    newActionImage = false;
    openModal();
  }

  async function deleteRow(index) {
    const response = await fetch($page.url.pathname, {
      method: "DELETE",
      body: JSON.stringify({
        actId: program.act[index].id,
        order: program.act[index].order,
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    if (await response.json()) {
      alert("삭제되었습니다.");
      window.location.reload();
    } else {
      alert("오류가 발생하였습니다.");
    }
  }
</script>

<div class="felx flex-col text-lg font-bold">
  <h1>Program</h1>
  <h2>{program.name}</h2>
</div>
<div>
  <div class="relative mb-2 flex flex-col items-center overflow-x-auto shadow-md sm:rounded-lg">
    <p class="mb-2 text-lg font-bold">연결된 상품 목록</p>
    <table class="w-full table-fixed text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
      <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3"> Index </th>
          <th scope="col" class="px-6 py-3"> Image </th>
          <th scope="col" class="px-6 py-3"> Name </th>
          <th scope="col" class="px-6 py-3"> Ingredient </th>
          <th scope="col" class="px-6 py-3"> Description </th>
          <th scope="col" class="px-6 py-3"> Feature </th>
          <th scope="col" class="px-6 py-3"> Link </th>
        </tr>
      </thead>
      <tbody>
        {#each program.product as product, idx}
          <tr class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
            <td class="px-6 py-4"> {idx + 1} </td>
            <th scope="row" class="flex items-center whitespace-nowrap py-4 text-gray-900 dark:text-white">
              <img class="object-fit h-20 w-20" src={product?.imageUrl} alt="product" />
            </th>
            <td class="px-6 py-4"> {product?.name} </td>
            <td class="px-6 py-4">
              <div class="flex items-center">
                {product?.ingredient}
              </div>
            </td>
            <td class="px-6 py-4">
              {product?.description.substring(0, 30)}...
            </td>
            <td class="overflow-hidden px-6 py-4">
              {product?.feature.substring(0, 10)}...
            </td>
            <td class="overflow-hidden px-6 py-4">
              <a href={product?.shoppingUrl}> {product?.shoppingUrl} </a>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div class="relative mb-2 flex flex-col items-center overflow-x-auto shadow-md sm:rounded-lg">
    <p class="mb-2 text-lg font-bold">Act</p>
    <table class="w-full table-fixed text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
      <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3"> Index </th>
          <th scope="col" class="px-6 py-3"> Title </th>
          <th scope="col" class="px-6 py-3"> SubTitle </th>
          <th scope="col" class="px-6 py-3"> Image </th>
          <th scope="col" class="px-6 py-3"> Duration (Minute) </th>
          <th scope="col" class="px-6 py-3"> isOverTime </th>
          <th scope="col" class="px-6 py-3"> Actions </th>
        </tr>
      </thead>
      <tbody>
        {#each program.act as act, idx}
          <tr class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
            <td class="px-6 py-4"> {idx + 1} </td>

            <td class="px-6 py-4"> {act.title} </td>
            <td class="px-6 py-4">
              <div class="flex items-center">
                {act.subTitle}
              </div>
            </td>
            <th scope="row" class="flex items-center whitespace-nowrap py-4 text-gray-900 dark:text-white">
              <img class="object-fit h-20 w-20" src={act.imageUrl} alt="product" />
            </th>
            <td class="px-6 py-4">
              {act.duration}
            </td>
            <td class="overflow-hidden px-6 py-4">
              {act.isOvertime}
            </td>
            <td class="px-6 py-4">
              <button
                type="button"
                class="mb-2 me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                on:click={() => deleteRow(idx)}>Delete</button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>

    <div class="mt-4">
      <button
        type="button"
        class="mb-2 me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        on:click={addRow}>Add Row</button>
    </div>
  </div>

  <div class="flex items-center justify-center">
    <button
      type="button"
      on:click={() => goto(`/program`)}
      class="mb-2 me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
      >목록</button>
    <button
      type="button"
      on:click={() => history.back()}
      class="mb-2 me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
      >뒤로가기</button>
  </div>
</div>

{#if isModalOpen}
  <form
    method="post"
    action="?/save"
    use:enhance={addProgram}
    class="fixed inset-0 z-10 flex items-center justify-center">
    <div class="absolute inset-0 bg-gray-900 opacity-50"></div>
    <div class="z-20 rounded bg-white p-6 shadow-md">
      <h2 class="mb-4 text-lg font-semibold">Add New Program</h2>
      <input type="text" placeholder="Title" bind:value={newAct.title} class="mb-2 w-full rounded border p-2" />
      <input type="text" placeholder="Subtitle" bind:value={newAct.subTitle} class="mb-2 w-full rounded border p-2" />
      <input type="file" accept="image/*" class="mb-2 w-full rounded border p-2" on:change={handleImageUpload} />
      <img src={newAct.imageUrl} alt="Preview" class="mb-2 h-32 w-32" />
      <input type="number" placeholder="Duration" bind:value={newAct.duration} class="mb-2 w-full rounded border p-2" />
      <label class="flex items-center">
        <input type="checkbox" bind:checked={newAct.isOvertime} class="mr-2" />
        <span>Is Overtime</span>
      </label>
      <div class="mt-4 flex justify-end">
        <button class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600" formaction="?/save">Add</button>
        <button class="ml-2 rounded bg-gray-400 px-4 py-2 text-white" on:click={closeModal}>Cancel</button>
      </div>
    </div>
  </form>
{/if}
