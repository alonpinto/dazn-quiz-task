import { ChangeEvent, useState } from "react";
import { GuessStatus } from "../../enums/GuessStatus";
import GuessFeedback from "../GuessFeedback/GuessFeedback";

interface QuizOptionProps {
  option: string;
  status?: GuessStatus;
  answer: string;
  handleUserGuess: (guess: string) => void;
}

const QuizOption = ({ option, handleUserGuess, answer }: QuizOptionProps) => {
  const [guess, setGuess] = useState<string | undefined>(undefined);
  const [checked, setChecked] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const onUserGuess = (e: ChangeEvent<HTMLInputElement>) => {
    setDisabled(true);
    const currGuess = e.target!.value;
    setChecked(currGuess === option);
    setGuess(currGuess);
    handleUserGuess(currGuess);
  };

  return (
    <div className="pl-12">
      <div className="flex items-center mr-4 mb-4">
        <input
          type="radio"
          id={`${option}`}
          name={`radio_group`}
          value={`${option}`}
          className="hidden"
          checked={checked}
          onChange={onUserGuess}
          disabled={disabled}
        />
        <label
          htmlFor={`${option}`}
          className="flex items-center cursor-pointer text-xl"
        >
          <span className="w-8 h-8 inline-block mr-2 rounded-full border border-grey flex-no-shrink"></span>
          {option} <GuessFeedback guess={guess} answer={answer} />
        </label>
      </div>
    </div>
  );
};

export default QuizOption;
