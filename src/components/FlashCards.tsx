import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useState } from "react";
import bg from "../assets/bg.svg";
import { getFlashCards } from "../api";

const MAX_NUMBER = 30;

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
      <h1 className="text-xl">{question.question}</h1>
      <div className="flex flex-col items-start justify-start w-full space-y-2">
        {question.answerOptions.map((v, i) => {
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
          {question.correctAnswerReason}
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
    <div className="flex-1">
      <p className="text-xl mb-2">{card.heading}</p>
      <div dangerouslySetInnerHTML={{ __html: card.content }}></div>
    </div>
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
  const [cookies] = useCookies(["fcId"]);

  const query = useQuery({
    queryKey: ["flashCards"],
    queryFn: () => getFlashCards(cookies.fcId),
  });
  console.log(query.data);

  const [index, setIndex] = useState<number>(1);
  // const [_, setCurrent] = useState(0);
  // const [valueToSubtract, setValueToSubtract] = useState(0);

  const change = (i: number) => {
    // if (i > 0)
    //   setCurrent((prev) => {
    //     if (prev + 1 === 5) {
    //       setValueToSubtract((prev) => prev + 1);
    //       return 0;
    //     }
    //     return prev + 1;
    //   });

    // if (i < 0)
    //   setCurrent((prev) => {
    //     if (prev - 1 === 0) {
    //       setValueToSubtract((prev) => (prev !== 0 ? prev - 1 : 0));
    //       return 0;
    //     }
    //     return prev - 1;
    //   });

    setIndex((prev) => {
      return prev + i;
    });
  };
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
      }}
      className="min-h-screen w-full flex justify-center items-center bg-white/90 bg-cover bg-center"
    >
      <div className="max-w-2xl bg-white min-h-96 border w-full rounded-md flex flex-col  px-6 py-4 ">
        {index % 6 === 0 && query.isFetched && query.data && (
          <Question
            question={query.data[index - 1]}
            change={change}
            index={index}
          />
        )}
        {index % 6 !== 0 && query.isFetched && query.data && (
          <Card card={query.data[index - 1]} />
        )}

        {index % 6 !== 0 && <Buttons change={change} index={index} />}
      </div>
    </div>
  );
}
