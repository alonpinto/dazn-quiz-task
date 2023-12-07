import { ChangeEvent, useState } from "react";
import { GuessStatus } from "../../enums/GuessStatus";

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
          {option}
          {guess !== undefined && (guess === answer ? "Correct" : "Wrong")}
        </label>
      </div>
      {/* <input
        className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
        checked={guess === option}
        onChange={onUserGuess}
        type="radio"
        name={`${option}`}
        id={`${option}`}
      />
      <label
        className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
        htmlFor={`${option}`}
      >
        {option}
      </label> */}
    </div>
  );
};

export default QuizOption;
