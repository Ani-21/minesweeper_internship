import { FC, ReactNode } from "react";
import { CellState, CellValue } from "../../types";

import "./Button.scss";

interface ButtonProps {
  row: number;
  col: number;
  state: CellState;
  value: CellValue;
}

export const Button: FC<ButtonProps> = ({ row, col, state, value }) => {
  const renderContent = (): ReactNode => {
    if (state === CellState.visible) {
      if (value === CellValue.bomb) {
        return (
          <span role="img" aria-label="bomb">
            💣
          </span>
        );
      } else if (value === CellValue.none) {
        return null;
      }
      return value;
    } else if (state === CellState.flagged) {
      <span role="img" aria-label="flag">
        🚩
      </span>;
    } else if (state === CellState.questioned) {
      <span role="img" aria-label="flag">
        ?
      </span>;
    }

    return null;
  };
  return (
    <div
      className={`Button ${
        state === CellState.visible ? "visible" : ""
      } value-${value} `}
    >
      {renderContent()}
    </div>
  );
};
