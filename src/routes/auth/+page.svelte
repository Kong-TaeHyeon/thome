<script>
  import { enhance } from "$app/forms";

  let email = "";
  let password = "";

  const submitForm = async ({ formData, cancel }) => {
    formData.append("email", email);
    formData.append("password", password);
    return;
  };
</script>

<div>
  <div>Thome App 관리자 사이트</div>
  <form method="post" use:enhance={submitForm}>
    <input
      bind:value={email}
      class="mr-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
    <input
      bind:value={password}
      class="mr-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
    <button
      formaction="?/signIn"
      class="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
      >로그인</button>
    <button
      type="submit"
      formaction="?/signUp"
      class="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
      >회원가입</button>
  </form>
</div>
