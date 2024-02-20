<script>
  import { enhance } from "$app/forms";
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

  function addProgram() {
    program.act = [...program.act, newAct];
    closeModal();
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

  function deleteRow(index) {
    program.act = program.act.filter((_, i) => i !== index);
  }

  async function handleSubmit({ formData }) {
    let length = program.act.length;

    for (let i = 0; i < length; i++) {
      if (program.act[i].id) {
        formData.append(`${i}imageUrl`, program.act[i].imageUrl);
        formData.append(`${i}title`, program.act[i].title);
        formData.append(`${i}subTitle`, program.act[i].subTitle);
        formData.append(`${i}duration`, program.act[i].duration);
        formData.append(`${i}isOvertime`, program.act[i].isOverTime);
        formData.append(`${i}order`, i);
      } else {
        formData.append(`${i}title`, program.act[i].title);
        formData.append(`${i}subTitle`, program.act[i].subTitle);
        formData.append(`${i}duration`, program.act[i].duration);
        formData.append(`${i}isOvertime`, program.act[i].isOvertime);
        formData.append(`${i}order`, i);
        if (program.act[i].imageFile === "") formData.append(`${i}imageUrl`, program.act[i].imageUrl);
        else formData.append(`${i}imageFile`, program.act[i].imageFile);
      }
    }

    formData.append("length", length);

    return ({ result }) => {
      if (result.type === "success") {
        alert("등록되었습니다.");
        window.location.reload();
      } else {
        alert("오류가 발생하였습니다.");
        window.location.reload();
      }
    };
  }
</script>

<div class="felx flex-col text-lg font-bold">
  <h1>Program</h1>
  <h2>{program.name}</h2>
</div>
<form method="post" action="?/save" use:enhance={handleSubmit}>
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
      type="submit"
      on:click={handleSubmit}
      class="mb-2 me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
      >저장</button>

    <button
      type="button"
      class="mb-2 me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
      >취소</button>
  </div>
</form>

{#if isModalOpen}
  <div class="fixed inset-0 z-10 flex items-center justify-center">
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
        <button class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600" on:click={addProgram}>Add</button>
        <button class="ml-2 rounded bg-gray-400 px-4 py-2 text-white" on:click={closeModal}>Cancel</button>
      </div>
    </div>
  </div>
{/if}
