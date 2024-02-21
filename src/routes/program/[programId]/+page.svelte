<script>
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  export let data;
  const { program } = data;

  let bannerImage = {
    imageUrl: program.bannerImageUrl,
    imageFile: null,
    check: false,
  };

  let bannerComingSoonImage = {
    imageUrl: program.bannerImageUrlComingSoon,
    imageFile: null,
    check: false,
  };

  let productImage = {
    imageUrl: program.productImageUrl,
    imageFile: null,
    check: false,
  };

  const handleBannerImageUpload = (event) => {
    bannerImage.imageFile = event.target.files[0];
    bannerImage.imageUrl = URL.createObjectURL(event.target.files[0]);
  };

  const handleBannerComingSoonImageUpload = (event) => {
    bannerComingSoonImage.imageFile = event.target.files[0];
    bannerComingSoonImage.imageUrl = URL.createObjectURL(event.target.files[0]);
  };

  const handleProductImageUpload = (event) => {
    productImage.imageFile = event.target.files[0];
    productImage.imageUrl = URL.createObjectURL(event.target.files[0]);
  };

  const deleteBannerComingSoonImage = () => {
    bannerComingSoonImage.imageFile = null;
    bannerComingSoonImage.imageUrl = null;
  };
  const deleteBannerImage = () => {
    bannerImage.imageFile = null;
    bannerImage.imageUrl = null;
  };
  const deleteProductImage = () => {
    productImage.imageFile = null;
    productImage.imageUrl = null;
  };

  const handleSubmit = async ({ formData, cancel }) => {
    formData.append("name", program.name);
    formData.append("isComingSoon", program.isComingSoon);
    formData.append("duration", program.duration);
    formData.append("feature", program.feature);
    formData.append("infoText", program.infoText);
    formData.append("ingredient", program.ingredient);
    formData.append("manual", program.manual);

    // Image Logic
    if (bannerImage.imageUrl === null) {
      alert("배너 이미지는 필수 입니다.");
      cancel();
    } else {
      // Image 를 수정하지 않는 것.
      if (bannerImage.imageFile === null) {
        formData.append("bannerImage", "url");
        formData.append("bannerImageUrl", program.bannerImageUrl);
      } else {
        // Image 를 새로 업로드해야 함.
        formData.append("bannerImage", "file");
        formData.append("bannerImageFile", bannerImage.imageFile);
      }
    }
    if (bannerComingSoonImage.imageUrl === null) {
      formData.append("bannerComingSoonImage", "no");
    } else {
      // Image 를 수정하지 않는 것.
      if (bannerComingSoonImage.imageFile === null) {
        formData.append("bannerComingSoonImage", "url");
        formData.append("bannerComingSoonImageUrl", program.bannerImageUrlComingSoon);
      } else {
        // Image 를 새로 업로드해야 함.
        formData.append("bannerComingSoonImage", "file");
        formData.append("bannerComingSoonImageFile", bannerComingSoonImage.imageFile);
      }
    }
    if (productImage.imageUrl === null) {
      formData.append("productImage", "no");
    } else {
      // Image 를 수정하지 않는 것.
      if (productImage.imageFile === null) {
        formData.append("productImage", "url");
        formData.append("productImageUrl", program.productImageUrl);
      } else {
        // Image 를 새로 업로드해야 함.
        formData.append("productImage", "file");
        formData.append("productImageFile", productImage.imageFile);
      }
    }

    return ({ result }) => {
      if (result.data === "Success") {
        alert("저장 완료.");
        window.location.href = "/program";
      } else {
        alert("형식을 맞춰주세요.");
      }
    };
  };
</script>

<form method="post" action="?/save" use:enhance={handleSubmit}>
  <div class="mt-20 w-full items-center justify-center">
    <div class="mx-auto w-full rounded-lg bg-white p-4 shadow-lg">
      <div class="mb-2">
        <p class="font-bold">프로그램명</p>
        <input class="w-full border border-gray-400" bind:value={program.name} />
      </div>

      <div class="mb-2">
        <p class="font-bold">Is Coming Soon</p>
        <select bind:value={program.isComingSoon}>
          <option value={true}>TRUE</option>
          <option value={false}>FALSE</option>
        </select>
      </div>

      <div class="mb-2">
        <p class="font-bold">프로그램 소요시간 (분)</p>
        <input type="number" class="w-full border border-gray-400" bind:value={program.duration} />
      </div>

      <div class="mb-2">
        <p class="font-bold">Feature</p>
        <textarea class=" h-20 w-full border border-gray-400" bind:value={program.feature} />
      </div>

      <div class="border-[1px] border-black"></div>

      <div class="mb-2">
        <p class="font-bold">프로그램 설명</p>
        <textarea class="w-full border border-gray-400" bind:value={program.infoText} />
      </div>

      <div class="mb-2">
        <p class="font-bold">프로그램 재료</p>
        <textarea class="h-20 w-full border border-gray-400" bind:value={program.ingredient} />
      </div>

      <div class="mb-2">
        <p class="font-bold">프로그램 메뉴얼</p>
        <textarea class="h-20 w-full border border-gray-400" bind:value={program.manual} />
      </div>

      <div class="flex flex-row items-center justify-center">
        <div class="mr-4">
          <p class=" font-bold">배너 이미지</p>
          <img class="h-32 w-32" src={bannerImage.imageUrl} alt="banner" />
          <button
            type="button"
            on:click={() => document.getElementById("bannerImageUpload").click()}
            class="mb-2 me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >이미지 변경</button>
          <button
            type="button"
            class="mb-2 me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            on:click={deleteBannerImage}>이미지 제거</button>
        </div>
        <div class="ml-4 mr-4">
          <p class=" font-bold">배너 커밍순 이미지</p>
          <img class="h-32 w-32" src={bannerComingSoonImage.imageUrl} alt="bannerComingSoon" />
          <button
            type="button"
            on:click={() => document.getElementById("bannerComingSoonImageUpload").click()}
            class="mb-2 me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >이미지 변경</button>
          <button
            type="button"
            class="mb-2 me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            on:click={deleteBannerComingSoonImage}>이미지 제거</button>
        </div>
        <div class="ml-4">
          <p class=" font-bold">상품 이미지</p>
          <img class="h-32 w-32" src={productImage.imageUrl} alt="product" />
          <button
            type="button"
            on:click={() => document.getElementById("productImageUpload").click()}
            class="mb-2 me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >이미지 변경</button>
          <button
            type="button"
            class="mb-2 me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            on:click={deleteProductImage}>이미지 제거</button>
        </div>
      </div>
      {#if $page.url.pathname !== "/program/null"}
        <div class="flex flex-col items-center">
          <button
            type="button"
            on:click={() => goto(`/program/${program.id}/act`)}
            class="mb-2 me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >Act 제품 수정하기</button>
        </div>
      {/if}

      <div class="mb-2 mt-2 border-[1px] border-black"></div>
      <div class="flex items-center justify-center">
        <button
          type="submit"
          formaction="?/save"
          class="mb-2 me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >저장</button>

        <button
          type="button"
          on:click={() => goto("/program")}
          class="mb-2 me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >취소</button>
      </div>
    </div>
  </div>
</form>

<input type="file" on:change={handleBannerImageUpload} id="bannerImageUpload" style="display: none;" accept="image/*" />
<input
  type="file"
  on:change={handleBannerComingSoonImageUpload}
  id="bannerComingSoonImageUpload"
  style="display: none;"
  accept="image/*" />
<input
  type="file"
  on:change={handleProductImageUpload}
  id="productImageUpload"
  style="display: none;"
  accept="image/*" />
