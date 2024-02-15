import contactRepository from "../lib/repository/contactRepository";
import pointRepository from "../lib/repository/pointRepository";
import userRepository from "../lib/repository/userRepository";

export const load = async () => {
  let totalWeekPoint = 0;
  let totalMonthPoint = 0;

  const { weekPoints, monthPoints } = await pointRepository.fetchPointWeek();
  const totalUser = await userRepository.fetchTotalUser();
  const { weekCount, monthCount } = await userRepository.fetchNewUser();
  const { weekContact, monthContact, pendingContact } = await contactRepository.fetchContactBundle();

  for (let weekPoint of weekPoints) {
    totalWeekPoint += weekPoint.point;
  }

  for (let monthPoint of monthPoints) {
    totalMonthPoint += monthPoint.point;
  }

  return {
    weekContact,
    monthContact,
    pendingContact,
    weekCount,
    monthCount,
    totalUser,
    totalWeekPoint,
    totalMonthPoint,
  };
};
