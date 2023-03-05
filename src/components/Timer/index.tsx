import { DigitDisplay } from "../DigitDisplay";
import "./Timer.scss";

type TimerProps = {
  value: number;
};

export const Timer = ({ value }: TimerProps) => {
  let splitValue = value.toString().padStart(3, "0").split("");

  return (
    <div className="Timer">
      <DigitDisplay value={Number(splitValue[0])} />
      <DigitDisplay value={Number(splitValue[1])} />
      <DigitDisplay value={Number(splitValue[2])} />
    </div>
  );
};
