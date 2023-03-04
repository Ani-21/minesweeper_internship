import React, { FC } from "react";
import "./NumberDisplay.scss";

type TimeDisplayProps = {
  value: number;
};

export const TimeDisplay: FC<TimeDisplayProps> = ({ value }) => {
  return (
    <div className="NumberDisplay">
      {value < 0
        ? `-${Math.abs(value).toString().padStart(2, "0")}`
        : value.toString().padStart(3, "0")}
    </div>
  );
};
