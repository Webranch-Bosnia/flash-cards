import axios from "axios";

const URL = "https://animated-way-383506.uc.r.appspot.com";
export const getFlashCards = async (id: string) => {
  const res = await axios.get(`${URL}/cd/flashCard/?id=${id}`);
  const nums = [5, 11, 17, 23, 29];
  const cards = res.data.cards;
  for (let i = 0; i < 5; i++) {
    cards.splice(nums[i], 0, res.data.quizzes[i]);
  }
  console.log(cards);

  return cards;
};
