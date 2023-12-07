interface GuessStatusProps {
  guess: string | undefined;
  answer: string;
}

const GuessFeedback = ({ guess, answer }: GuessStatusProps) => {
  if (guess === undefined) {
    return null;
  }

  return (
    <div className="mx-2">
      {guess === answer ? (
        <div className=" text-green-700 text-sm"> Good Job</div>
      ) : (
        <div className=" text-red-700 text-sm">Ops! answer is [{answer}]</div>
      )}
    </div>
  );
};

export default GuessFeedback;
