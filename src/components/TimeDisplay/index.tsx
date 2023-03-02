import React, { FC } from "react";
import "./TimeDisplay.scss";

type TimeDisplayProps = {
  value: number;
};

export const TimeDisplay: FC<TimeDisplayProps> = ({ value }) => {
  return (
    <div className="NumberDisplay">{value.toString().padStart(3, "0")}</div>
  );
};
