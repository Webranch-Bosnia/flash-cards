interface IFlashCard {
  heading: string;
  content: string;
}

interface IQuestion {
  question: string;
  answerOptions: string[];
  correctAnswer: number;
  correctAnswerReason: string;
}

interface IResponse {
  cards: IFlashCard[];
  currentNumber: number;
  id: string;
  quizzes: IQuestion[];
}
