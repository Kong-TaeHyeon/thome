<script>
  export let data;

  const {
    issueContact,
    weekContact,
    monthContact,
    pendingContact,
    weekCount,
    monthCount,
    totalUser,
    totalWeekPoint,
    totalMonthPoint,
  } = data;
</script>

<div class=" flex items-center justify-center p-4">
  <table class="w-full border-collapse items-center justify-center">
    <tr>
      <td class="border border-gray-300 px-4 py-2 font-bold">총회원수</td>
      <td class="border border-gray-300 px-4 py-2 font-bold">{totalUser}</td>
    </tr>
    <tr>
      <td colspan="2" class="border-t border-gray-300"></td>
    </tr>
    <tr>
      <td class="border border-gray-300 px-4 py-2 font-bold">신규가입</td>
      <td class="border border-gray-300 px-4 py-2">
        <table class="w-full">
          <tr>
            <td class="font-bold">이번주</td>
            <td class="font-bold">{weekCount}</td>
          </tr>
          <hr class="my-2 border-gray-300" />
          <tr>
            <td class="font-bold">이번달</td>
            <td class="font-bold">{monthCount}</td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td colspan="2" class="border-t border-gray-300"></td>
    </tr>
    <tr>
      <td class="border border-gray-300 px-4 py-2 font-bold">적립 DN</td>
      <td class="border border-gray-300 px-4 py-2">
        <table class="w-full">
          <tr>
            <td class="font-bold">이번주</td>
            <td class="font-bold">{totalWeekPoint}</td>
          </tr>
          <hr class="my-2 border-gray-300" />
          <tr>
            <td class="font-bold">이번달</td>
            <td class="font-bold">{totalMonthPoint}</td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td colspan="2" class="border-t border-gray-300"></td>
    </tr>

    <tr>
      <td class="border border-gray-300 px-4 py-2 font-bold">1:1 문의 현황</td>
      <td class="border border-gray-300 px-4 py-2">
        <table class="w-full">
          <tr>
            <td class="font-bold">이번주</td>
            <td>{weekContact}</td>
          </tr>
          <hr class="my-2 border-gray-300" />
          <tr>
            <td class="font-bold">이번달</td>
            <td>{monthContact}</td>
          </tr>
          <hr class="my-2 border-gray-300" />
          <tr>
            <td class="font-bold">미완료</td>
            <td class="text-red-300">{pendingContact}</td>
          </tr>
          <hr class="my-2 border-gray-300" />
          <tr>
            <td class="font-bold">이슈</td>
            <td class="text-red-300">{issueContact}</td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</div>
