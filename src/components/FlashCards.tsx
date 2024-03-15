// import { useQuery } from "@tanstack/react-query";
// import { useCookies } from "react-cookie";
import { useState } from "react";
import bg from "../assets/bg.svg";

const MAX_NUMBER = 31;

interface ICQuestion {
  question: IQuestion;
  change: (i: number) => void;
  index: number;
}
const Question = ({ question, change, index }: ICQuestion) => {
  const [selected, setSelected] = useState<number>(-1);
  const [correct, setCorrect] = useState<number>(0);
  const newChange = (i: number) => {
    setSelected(-1);
    setCorrect(0);
    change(i);
  };
  return (
    <div className="flex-1 space-y-4">
      <h1 className="text-xl">{question.questionText}</h1>
      <div className="flex flex-col items-start justify-start w-full space-y-2">
        {question.options.map((v, i) => {
          return (
            <div
              className={`px-4 py-2 w-full border rounded-md hover:border-red-new transition-all cursor-pointer ${
                selected === i && "border-red-new"
              }`}
              key={i}
              onClick={() => setSelected(i)}
            >
              {v}
            </div>
          );
        })}
      </div>
      {correct === 1 && (
        <p className="text-green-700">
          Congrats! You successfully answered that quesiton.
        </p>
      )}

      {correct === -1 && (
        <p className="text-red-700">
          Oops, you answered that incorrectly, here is the reason:
          <br />
          {question.reason}
        </p>
      )}

      {correct === 1 && <Buttons change={newChange} index={index} />}

      {correct !== 1 && (
        <div className="flex justify-end">
          <button
            onClick={() => {
              if (selected === question.correctAnswer) setCorrect(1);
              else setCorrect(-1);
            }}
            className="px-4 py-2 border bg-white/50 rounded-md hover:border-red-new transition-all disabled:cursor-not-allowed disabled:hover:border-transparent"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

interface ICCard {
  card: IFlashCard;
}
const Card = ({ card }: ICCard) => {
  return (
    <div
      className="flex-1"
      dangerouslySetInnerHTML={{ __html: card.text }}
    ></div>
  );
};

interface CButtons {
  change: (i: number) => void;
  index: number;
}
const Buttons = ({ change, index }: CButtons) => {
  return (
    <div className="flex w-full justify-end space-x-5">
      <button
        disabled={index === 1}
        onClick={() => change(-1)}
        className="px-4 py-2 border bg-white/50 rounded-md hover:border-red-new transition-all disabled:cursor-not-allowed disabled:hover:border-transparent"
      >
        Previous
      </button>
      <button
        disabled={index === MAX_NUMBER}
        onClick={() => change(1)}
        className="px-4 py-2 border bg-white/50 rounded-md hover:border-red-new transition-all disabled:cursor-not-allowed disabled:hover:border-transparent"
      >
        Next
      </button>
    </div>
  );
};

export default function FlashCards() {
  //   const [fcId] = useCookies(["fcId"]);
  //   const query = useQuery({ queryKey: ["flashCards"], queryFn: getFlashCards });
  const [flashCards] = useState<IFlashCard[]>(
    Array(25).fill({
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt mattis eros. Morbi porttitor libero mi, eu malesuada velit vestibulum porta. Curabitur non ultrices ligula. Praesent augue dolor, egestas at commodo ac, semper in eros. Aliquam erat volutpat. Donec dolor augue, rhoncus ac risus vitae, finibus scelerisque nisl. Cras sollicitudin volutpat arcu nec consectetur. Sed sagittis, leo eu faucibus tempus, neque ipsum dictum lectus, sit amet scelerisque tellus ex eget urna. Aenean interdum imperdiet justo condimentum molestie. Mauris commodo non tellus quis maximus. Vivamus ut rhoncus ipsum. Phasellus viverra neque id ultricies sodales. Donec turpis dolor, eleifend nec congue sit amet, commodo vel sapien. Phasellus suscipit a leo nec suscipit. Morbi purus ex, vehicula ut justo in, vehicula iaculis arcu.",
    })
  );

  const [questions] = useState<IQuestion[]>(
    Array(5).fill({
      questionText: "LKJljkasdfja jajlksdf jkajskldf ljkasdljk f",
      options: ["1", "2", "3", "4"],
      correctAnswer: 0,
      reason: "asdf ajklsdl faksjldf klj jklasdf jlk",
    })
  );

  const [index, setIndex] = useState<number>(1);

  const change = (i: number) => {
    setIndex((prev) => prev + i);
  };
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
      }}
      className="min-h-screen w-full flex justify-center items-center bg-white/90 bg-cover bg-center"
    >
      <div className="max-w-2xl bg-white min-h-96 border w-full rounded-md flex flex-col  px-6 py-4 ">
        {index % 5 === 0 && (
          <Question
            question={questions[index / 5 - 1]}
            change={change}
            index={index}
          />
        )}
        {index % 5 !== 0 && <Card card={flashCards[index - 1]} />}

        {index % 5 !== 0 && <Buttons change={change} index={index} />}
      </div>
    </div>
  );
}
