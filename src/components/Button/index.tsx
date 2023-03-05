import { CellState, CellValue } from "../../types";

import "./Button.scss";

interface ButtonProps {
  row: number;
  col: number;
  state: CellState;
  value: CellValue;
  red?: boolean;
  handleCellClick(rowParam: number, colParam: number): void;
  handleCellContextClick(
    rowParam: number,
    colParam: number
  ): (...args: any[]) => void;
}

export const Button = ({
  row,
  col,
  state,
  value,
  red,
  handleCellClick,
  handleCellContextClick,
}: ButtonProps) => {
  return (
    <div
      className={`Button ${
        state === CellState.visible
          ? "visible"
          : state === CellState.flagged
          ? "flagged"
          : state === CellState.wrong
          ? "wrong"
          : state === CellState.questioned
          ? "questioned"
          : ""
      } value-${value} ${red ? "red" : ""}
      `}
      onClick={() => handleCellClick(row, col)}
      onContextMenu={handleCellContextClick(row, col)}
    />
  );
};
