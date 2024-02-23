<script>
  import { enhance } from "$app/forms";

  export let goods;
  export let isModalOpen;
  export let closeModal;

  const handleImageUpload = (event) => {
    goods.imageFile = event.target.files[0];
    goods.imageUrl = URL.createObjectURL(event.target.files[0]);
  };

  // goods => ImageUrl, Name, Price, Description

  const submitHandler = ({ formData, cancel }) => {
    if (!goods.name) {
      alert("굿즈의 이름을 입력해주세요.");
      cancel();
    }

    formData.append("id", goods.id);
    formData.append("name", goods.name);
    formData.append("price", goods.price);
    formData.append("description", goods.description);

    if (goods.imageFile) formData.append("imageFile", goods.imageFile);
    formData.append("imageUrl", goods.imageUrl);

    return ({ result }) => {
      if (result.data === "success") {
        alert("등록되었습니다.");
        window.location.reload();
      } else {
        alert("오류가 발생하였습니다.");
        window.location.reload();
      }
    };
  };
</script>

{#if isModalOpen}
  <div class="fixed inset-0 z-10 flex items-center justify-center">
    <div class="absolute inset-0 bg-gray-900 opacity-50"></div>
    <div class="z-20 rounded bg-white p-6 shadow-md">
      <h2 class="mb-4 text-lg font-semibold">Add New Program</h2>
      <input type="text" placeholder="Title" bind:value={goods.name} class="mb-2 w-full rounded border p-2" />
      <input
        type="text"
        placeholder="Description"
        bind:value={goods.description}
        class="mb-2 w-full rounded border p-2" />
      <input type="number" placeholder="Price" bind:value={goods.price} class="mb-2 w-full rounded border p-2" />
      <input type="file" accept="image/*" class="mb-2 w-full rounded border p-2" on:change={handleImageUpload} />
      <img src={goods.imageUrl} alt="Preview" class="mb-2 h-32 w-32" />

      <form class="mt-4 flex justify-end" action="?/save" use:enhance={submitHandler} method="post">
        <button class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600" type="submit">Add</button>
        <button class="ml-2 rounded bg-gray-400 px-4 py-2 text-white" type="button" on:click={closeModal}
          >Cancel</button>
      </form>
    </div>
  </div>
{/if}
