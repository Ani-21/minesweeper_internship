import { FC, ReactNode, MouseEvent } from "react";
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

export const Button: FC<ButtonProps> = ({
  row,
  col,
  state,
  value,
  red,
  handleCellClick,
  handleCellContextClick,
}) => {
  const renderContent = (): ReactNode => {
    if (state === CellState.visible) return;

    return null;
  };

  return (
    <div
      className={`Button ${
        state === CellState.visible ? "visible" : ""
      } value-${value} ${red ? "red" : ""} `}
      onClick={() => handleCellClick(row, col)}
      onContextMenu={handleCellContextClick(row, col)}
    >
      {renderContent()}
    </div>
  );
};
