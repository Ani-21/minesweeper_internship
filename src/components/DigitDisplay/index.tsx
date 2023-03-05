import "./DigitDisplay.scss";

type DigitDisplayProps = {
  value: number;
};

export const DigitDisplay = ({ value }: DigitDisplayProps) => {
  return <div className={`DigitDisplay value-${value}`} />;
};
