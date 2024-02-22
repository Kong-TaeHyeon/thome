<script>
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";

  export let data;

  let selectedStatus;

  const { contact } = data;

  let answer = contact.answer;

  const submitForm = async ({ formData, cancel }) => {
    formData.append("id", contact.id);
    formData.append("userId", contact.userId);
    formData.append("status", selectedStatus);
    formData.append("answer", answer);

    return async ({ result }) => {
      if (result.data === "Success") {
        alert("답변이 등록되었습니다.");
        window.location.reload();
      } else {
        alert("답변 등록에 실패하였습니다.");
        window.location.reload();
      }
    };
  };
</script>

<div class="mt-20 items-center justify-center">
  <div class="mx-auto max-w-lg rounded-lg bg-white p-4 shadow-lg">
    <div class="mb-4 mt-2 border-b border-gray-300">
      <h2 class="mb-2 text-lg font-bold">제목: {contact.title}</h2>

      <p class="mb-2">분류: {contact.type}</p>

      <p class="mb-4">문의 시간: {contact.createdAt ? new Date(contact.createdAt).toLocaleString() : ""}</p>
    </div>

    <div class="mb-4 border-b border-gray-300">
      <div class="mb-4">
        <p class="mb-2 font-bold">문의 내용</p>
        <p>{contact.question}</p>
      </div>
    </div>

    <div class="mb-4 border-b border-gray-300">
      <div class="mb-4">
        <p class="mb-2 font-bold">상태</p>
        <select bind:value={selectedStatus}>
          <option value="PENDING">PENDING</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="ISSUE">ISSUE</option>
        </select>
      </div>
    </div>

    <div class="mb-4 border-b border-gray-300">
      <div class="mb-4">
        <p class="mb-2 font-bold">답변자</p>
        <p>{contact.respondent || "미정"}</p>
      </div>
    </div>

    <form class="mb-4" method="post" action="?/save" use:enhance={submitForm}>
      <p class="font-bold">답변</p>
      <textarea
        bind:value={answer}
        id="message"
        rows="4"
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder=". . . . ."></textarea>
      <div class="mt-4 flex justify-between">
        <button
          type="button"
          class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
          on:click={() => {
            goto("/contact");
          }}>
          취소
        </button>
        <button
          class="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:bg-green-600 focus:outline-none"
          formaction="?/save">저장 하기</button>
      </div>
    </form>
  </div>
</div>
