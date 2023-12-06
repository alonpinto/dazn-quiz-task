import { ChangeEvent, useState } from "react";
import { GuessStatus } from "../../enums/GuessStatus";

interface QuizOptionProps {
  option: string;
  status?: GuessStatus;
  handleUserGuess: (guess: string) => void;
}

const QuizOption = ({ option, handleUserGuess }: QuizOptionProps) => {
  const [guess, setGuess] = useState<string | undefined>(undefined);

  const onUserGuess = (e: ChangeEvent<HTMLInputElement>) => {
    setGuess(e.target!.value);
    handleUserGuess(e.target!.value);
  };

  return (
    <>
      <div className="flex gap-2">
        <input
          type="radio"
          id={`${option}`}
          name={`${option}`}
          value={option}
          checked={guess === option}
          onChange={onUserGuess}
        />
        <label htmlFor={`${option}`}>
          {option}{" "}
          {/* {status !== GuessStatus.NONE &&
            (status === GuessStatus.CORRECT ? "Correct" : "Wrong")} */}
        </label>
      </div>
    </>
  );
};

export default QuizOption;
