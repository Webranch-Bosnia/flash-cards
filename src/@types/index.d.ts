interface IFlashCard {
  text: string;
}

interface IQuestion {
  questionText: string;
  options: string[];
  correctAnswer: number;
  reason: string;
}
