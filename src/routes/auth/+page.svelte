<script>
  import { enhance } from "$app/forms";

  let name = "";
  let email = "";
  let password = "";

  const submitForm = async ({ formData, cancel }) => {
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    return ({ result }) => {
      if (result.data === "success") {
        alert("성공하였습니다.");
        window.location.reload();
      } else {
        alert("실패하였습니다.");
      }
    };
  };
</script>

<div class="flex flex-col items-center justify-center">
  <div class=" font-bold">Thome App 관리자 사이트</div>
  <form method="post" class="flex flex-col" use:enhance={submitForm}>
    <div class="mb-4">
      <input
        bind:value={name}
        placeholder="이름을 입력해주세요"
        class="mr-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <input
        bind:value={email}
        placeholder="ID를 입력해주세요"
        class="mr-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <input
        bind:value={password}
        placeholder="PW를 입력해주세요"
        class="mr-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>
    <button
      formaction="?/signIn"
      class="mb-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
      >로그인</button>

    <button
      formaction="?/signUp"
      class="mb-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
      >회원가입</button>
  </form>
</div>
