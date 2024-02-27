<script>
  import { goto } from "$app/navigation";

  export let data;

  const { contact } = data;
</script>

<div class="mt-20 items-center justify-center">
  <div class="mx-auto max-w-lg rounded-lg bg-white p-4 shadow-lg">
    <h2 class="mb-2 text-lg font-bold">제목: {contact.title}</h2>

    <p class="mb-2">분류: {contact.type}</p>

    <p class="mb-4">문의 시간: {contact.createdAt ? new Date(contact.createdAt).toLocaleString() : ""}</p>

    <div class="mb-4">
      <p class="mb-2 font-bold">문의 내용</p>
      <p>{contact.question}</p>
    </div>

    <div class="mb-4">
      <p class="mb-2 font-bold">상태</p>
      <p>{contact.status}</p>
    </div>

    <div class="mb-4 border-b border-gray-300">
      <div class="mb-4">
        <p class="mb-2 font-bold">답변자</p>
        <p>{contact.respondent || "미정"}</p>
      </div>
    </div>

    {#if contact.answer !== null}
      <div class="mb-4">
        <p class="mb-2 font-bold">답변</p>
        <p>{contact.answer}</p>
      </div>
    {/if}

    <div class="flex justify-between">
      <button
        class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
        on:click={() => {
          history.back();
        }}>목록 보기</button>
      <button
        class="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:bg-green-600 focus:outline-none"
        on:click={() => {
          goto(`${contact.id}/answer`);
        }}>답변 하기</button>
    </div>
  </div>
</div>
