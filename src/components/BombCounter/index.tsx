import { DigitDisplay } from "../DigitDisplay";
import "./BombCounter.scss";

type BombCounterProps = {
  value: number;
};

export const BombCounter = ({ value }: BombCounterProps) => {
  let splitValue = value < 0 ? "0" : value.toString().split("");

  return (
    <div className="BombCounter">
      <DigitDisplay value={0} />
      <DigitDisplay value={Number(splitValue[0])} />
      <DigitDisplay value={Number(splitValue[1])} />
    </div>
  );
};
