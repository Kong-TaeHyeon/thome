<script>
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import { utils, writeFile } from "xlsx";

  export let data;

  const { user, inviteUser, calRangePoint } = data;

  const userInfoDownload = async () => {
    const userInfo = [
      ["NickName", "Email", "BirthDay", "Gender", "SkinType", "Thome Index", "DN", "기간적립 DN", "Quiz"],
    ];

    userInfo.push([
      user.nickname,
      user.email,
      user.birthday,
      user.gender,
      user.skinType,
      user.thomeIndex,
      user.point.reduce((acc, cur) => (acc += cur.point), 0),
      calRangePoint,
      user.isQuizCompleted,
    ]);

    const wb = utils.book_new();
    let ws = utils.aoa_to_sheet(userInfo);
    utils.book_append_sheet(wb, ws, "User Basic Info");

    const thomeDay = [["일시", "프로그램"]];

    user.schedule.forEach((err) => {
      const schedule = [err.createdAt ? new Date(err.createdAt).toLocaleString() : "", err.program.name];
      thomeDay.push(schedule);
    });

    ws = utils.aoa_to_sheet(thomeDay);
    utils.book_append_sheet(wb, ws, "Thome Day Log");

    const coupon = [["일시", "쿠폰 코드", "가격"]];
    user.coupon.forEach((err) => {
      coupon.push([err.createdAt ? new Date(err.createdAt).toLocaleString() : "", err.code, err.goods.price]);
    });

    ws = utils.aoa_to_sheet(coupon);
    utils.book_append_sheet(wb, ws, "Thome Coupon Log");

    const record = [["일시", "프로그램", "Before", "After"]];
    user.record?.forEach((err) => {
      record.push([
        err.createdAt ? new Date(err.createdAt).toLocaleString() : "",
        err?.schedule.program.name,
        err?.beforeUrl,
        err?.afterUrl,
      ]);
    });

    ws = utils.aoa_to_sheet(record);
    utils.book_append_sheet(wb, ws, "Thome Record(셀피) Log");

    const contact = [["일시", "분류", "문의 내용", "답변 내용", "처리"]];

    user.contact.forEach((err) => {
      contact.push([
        err.createdAt ? new Date(err.createdAt).toLocaleString() : "",
        err?.type || "Null",
        err?.question || "Null",
        err?.answer || "Null",
        err?.status || "Null",
      ]);
    });

    ws = utils.aoa_to_sheet(contact);
    utils.book_append_sheet(wb, ws, "Contact Log");

    const invites = [["일시", "가입 계정"]];
    inviteUser.forEach((invite) => {
      invites.push([invite.createdAt ? new Date(invite.createdAt).toLocaleString() : "", invite.user.email]);
    });

    ws = utils.aoa_to_sheet(invites);
    utils.book_append_sheet(wb, ws, "Invite Log");

    writeFile(wb, "user.xlsx");
  };

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
        <p class="font-bold">적립 DN</p>
        {#if user.point.length !== 0}
          <p>{user.point.reduce((acc, cur) => (acc += cur.point), 0)}</p>
        {:else}
          <p>0</p>
        {/if}
      </div>

      <div class="m-2">
        <p class="font-bold">기간 적립 DN</p>
        <p>{calRangePoint}</p>
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
    <button type="button" on:click={userInfoDownload} class="mt-5 w-20 border-2">다운로드</button>
    <button type="button" class="mt-5 w-20 border-2" on:click={() => goto("/user")}>목록보기</button>
  </form>

  <div class="mb-2 flex flex-row">
    <p class="mt-4 text-lg font-bold">톰 데이 내역</p>
  </div>
  <div class="relative">
    <table class="w-full table-auto text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
      <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3"> 일시 </th>
          <th scope="col" class="px-6 py-3"> 프로그램 </th>
        </tr>
      </thead>
      <tbody>
        {#each user.schedule as schedule, idx}
          <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
            <th scope="row" class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
              {schedule.createdAt ? new Date(schedule.createdAt).toLocaleString() : ""}
            </th>
            <td class="px-6 py-4"> {schedule.program.name} </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div class="flex flex-row">
    <p class="mt-4 text-lg font-bold">톰 머치 쿠폰 구매 내역</p>
  </div>
  <div class="relative">
    <table class="w-full table-auto text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
      <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3"> 일시 </th>
          <th scope="col" class="px-6 py-3"> 쿠폰 코드 </th>
          <th scope="col" class="px-6 py-3"> 가격 </th>
        </tr>
      </thead>
      <tbody>
        {#each user.coupon as coupon, idx}
          <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
            <th scope="row" class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
              {coupon.createdAt ? new Date(coupon.createdAt).toLocaleString() : ""}
            </th>
            <td class="px-6 py-4"> {coupon.code} </td>
            <td class="px-6 py-4"> {coupon.goods.price} </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div class="flex flex-row">
    <p class="mt-4 text-lg font-bold">톰 셀피 기록</p>
  </div>
  <div class="relative">
    <table class="w-full table-auto text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
      <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3"> 일시 </th>
          <th scope="col" class="px-6 py-3"> 프로그램 </th>
          <th scope="col" class="px-6 py-3"> Before </th>
          <th scope="col" class="px-6 py-3"> After </th>
        </tr>
      </thead>
      <tbody>
        {#each user.record as record, idx}
          <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
            <th scope="row" class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
              {record.createdAt ? new Date(record.createdAt).toLocaleString() : ""}
            </th>
            <td class="px-6 py-4"> {record.schedule.program.name} </td>
            <td class="px-6 py-4">
              <img class="mr-2 h-12 w-12 rounded-full" alt="profile" src={record?.beforeUrl} />
            </td>

            <td class="px-6 py-4">
              <img class="mr-2 h-12 w-12 rounded-full" alt="profile" src={record?.afterUrl} />
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div class="flex flex-row">
    <p class="mt-4 text-lg font-bold">1:1 문의 내역</p>
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
