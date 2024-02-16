<script>
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";

  export let data;

  const { user, inviteUser } = data;

  const handleReTouch = ({ formData }) => {
    formData.append("id", user.id);
    formData.append("skinType", user.skinType);
    formData.append("gender", user.gender);
    formData.append("birthday", user.birthday || "");
    formData.append("thomeIndex", user.thomeIndex || "");

    return ({ result }) => {
      if (result.data === "success") {
        alert("유저 정보가 업데이트 되었습니다.");
        window.location.reload();
      } else {
        alert("에러가 발생하였습니다.");
        window.location.reload();
      }
    };
  };
</script>

<div class="flex flex-col items-center justify-center">
  <div class="mt-10 flex w-full items-center justify-center border-4">
    <div>
      <img class="m-2 h-20 w-20 rounded-full" src={user.profileImageUrl} alt="profile" />
      <div class="m-2">
        <p class="font-bold">Nickname</p>
        <p>{user.nickname || "X"}</p>
      </div>
      <div class="m-2">
        <p class="font-bold">Gender</p>
        <select bind:value={user.gender}>
          <option value="MALE">MALE</option>
          <option value="FEMALE">FEMALE</option>
        </select>
      </div>
      <div class="m-2">
        <!-- 이렇게 수정할 수 있도록 하자 -->
        <p class="font-bold">생년월일</p>
        <input bind:value={user.birthday} />
      </div>
    </div>

    <div class="ml-4">
      <div class="m-2">
        <p class="font-bold">Quiz</p>
        <p>{user.isQuizCompleted}</p>
      </div>

      <div class="m-2">
        <p class="font-bold">잔여 DN</p>
        <p>200</p>
      </div>

      <div class="m-2">
        <p class="font-bold">기간 적립 DN</p>
        <p>200</p>
      </div>
    </div>

    <div>
      <div class="m-2 ml-4">
        <div class="m-2">
          <p class="font-bold">Skin Type</p>
          <input class="border" bind:value={user.skinType} />
        </div>
        <p class="font-bold">Thome Index</p>
        <select bind:value={user.thomeIndex}>
          <option value="AAA">AAA</option>
          <option value="AA">AA</option>
          <option value="A">A</option>
          <option value="BBB">BBB</option>
          <option value="BB">BB</option>
          <option value="CCC">CCC</option>
          <option value="CC">CC</option>
          <option value="C">C</option>
        </select>
      </div>
    </div>
  </div>
  <form method="post" action="?/save" use:enhance={handleReTouch}>
    <button type="submit" formaction="?/save" class="mt-5 w-20 border-2">저장하기</button>

    <button class="mt-5 w-20 border-2" on:click={() => goto("/user")}>목록보기</button>
  </form>

  <div class="flex flex-row">
    <p class="mt-4 text-lg font-bold">1:1 문의 내역</p>
    <!-- <button class="ml-2 mt-4 w-20 rounded border text-lg font-bold hover:bg-blue-700">더보기</button> -->
  </div>

  <div class="relative">
    <table class="w-full table-auto text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
      <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3"> 일시 </th>
          <th scope="col" class="px-6 py-3"> 분류 </th>
          <th scope="col" class="px-6 py-3"> 문의 내용 </th>
          <th scope="col" class="px-6 py-3"> 답변 내용 </th>
          <th scope="col" class="px-6 py-3"> 처리 </th>
        </tr>
      </thead>
      <tbody>
        {#each user.contact as contact}
          <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
            <th scope="row" class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
              {contact.createdAt ? new Date(contact.createdAt).toLocaleString() : ""}
            </th>
            <td class="px-6 py-4"> {contact.type} </td>
            <td class="px-6 py-4"> {contact.title} </td>
            <td class="px-6 py-4"> {contact.answer} </td>
            <td class="px-6 py-4"> {contact.status} </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div class="flex flex-row">
    <p class="mt-4 text-lg font-bold">친구 초대 내역</p>
  </div>
  <div class="relative">
    <table class="w-full table-auto text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
      <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3"> 일시 </th>
          <th scope="col" class="px-6 py-3"> 가입 계정 </th>
        </tr>
      </thead>
      <tbody>
        {#each inviteUser as invite}
          <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
            <th scope="row" class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
              {invite.createdAt ? new Date(invite.createdAt).toLocaleString() : ""}
            </th>
            <td class="px-6 py-4"> {invite.user.email} </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
