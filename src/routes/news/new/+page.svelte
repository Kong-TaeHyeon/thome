<script>
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";

  let title = "";
  let content = "";

  const handleSubmit = ({ formData, cancel }) => {
    formData.append("title", title);
    formData.append("content", content);

    return ({ result }) => {
      if (result.type === "success") {
        alert("성공적으로 등록되었습니다.");
        window.location.href = "/news";
      }
    };
  };
</script>

<div class=" items-center justify-center">
  <form method="post" use:enhance={handleSubmit} action="?/save" class="items-center justify-center">
    <div class="mb-4 mt-4">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Title</label>
      <input
        bind:value={title}
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder="Write title"
        required />
    </div>
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Content</label>
    <textarea
      id="message"
      bind:value={content}
      rows="4"
      class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      placeholder="Write Content..."></textarea>

    <button
      type="submit"
      formaction="?/save"
      class="mb-2 me-2 mt-4 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
      >뉴스 등록</button>

    <button
      type="button"
      on:click={() => {
        goto("/news");
      }}
      class="mb-2 me-2 mt-4 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
      >취소</button>
  </form>
</div>
