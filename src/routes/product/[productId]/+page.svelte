<script>
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";

  export let data;
  const { product, programs } = data;

  let image = product.imageUrl || null;
  let imageFile;

  const handleImageChange = (event) => {
    imageFile = event.target.files[0];
    image = URL.createObjectURL(imageFile);
  };

  const deleteImage = () => {
    imageFile = null;
    image = null;
  };

  const handleSubmit = async ({ formData }) => {
    formData.append("id", product.id);
    formData.append("name", product.name);
    formData.append("ingredient", product.ingredient);
    formData.append("description", product.description);
    formData.append("feature", product.feature);
    formData.append("manual", product.manual);
    formData.append("shoppingUrl", product.shoppingUrl);
    formData.append("programId", product.programId);

    if (image === null) {
      // image 가 없는 경우.
      formData.append("img", null);
    } else {
      formData.append("img", imageFile);
    }

    return ({ result }) => {
      if (result.data === "Success") {
        alert("업데이트 완료.");
        window.location.reload();
      } else {
        alert("오류 발생");
      }
    };
  };
</script>

<form class="mt-20 w-full items-center justify-center" method="post" action="?/save" use:enhance={handleSubmit}>
  <div class="mx-auto w-full rounded-lg bg-white p-4 shadow-lg">
    <div class="mb-2">
      <p class="font-bold">제품명</p>
      <input class="w-full border border-gray-400" bind:value={product.name} />
    </div>
    <div class="mb-2">
      <p class="font-bold">재료</p>
      <input class=" w-full border border-gray-400" bind:value={product.ingredient} />
    </div>

    <div class="border-[1px] border-black"></div>

    <div class="mb-2">
      <p class="font-bold">제품 설명</p>
      <textarea class="w-full border border-gray-400" bind:value={product.description} />
    </div>

    <div class="mb-2">
      <p class="font-bold">제품 특징</p>
      <textarea class="h-20 w-full border border-gray-400" value={product.feature} />
    </div>

    <div class="mb-2">
      <p class="font-bold">제품 메뉴얼</p>
      <textarea class="h-20 w-full border border-gray-400" value={product.manual} />
    </div>

    <div class="mb-2">
      <p class="font-bold">제품 링크</p>
      <input class=" w-full border border-gray-400" bind:value={product.shoppingUrl} />
    </div>

    <div class="mb-4 mt-4 border-[1px] border-black"></div>

    <div>
      <p class="mb-2 font-bold">상품 사진</p>
      <img src={image} class="h-20 w-20 object-contain" alt="product" />
      <button
        type="button"
        on:click={() => document.getElementById("imageUpload").click()}
        class="me-2 mt-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        >이미지 교체</button>
      <button
        type="button"
        class="mb-2 me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        on:click={deleteImage}>이미지 제거</button>
    </div>

    <div>
      <p class="mb-2 font-bold">연결 프로그램</p>
      <select bind:value={product.programId}>
        {#each programs as program}
          <option value={program.id}>{program.name}</option>
        {/each}
        <option value={null}>연결 안함</option>
      </select>
    </div>

    <input type="file" on:change={handleImageChange} id="imageUpload" style="display: none;" accept="image/*" />

    <div class="flex items-center justify-center">
      <button
        type="submit"
        formaction="?/save"
        class="mb-2 me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        >저장</button>

      <button
        type="button"
        class="mb-2 me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        on:click={() => {
          goto("/product");
        }}>취소</button>
    </div>
  </div>
</form>
