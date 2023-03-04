import { MAX_COLS, MAX_ROWS, BOMBS_NUM } from "../constants";
import { CellState, CellValue, Cell } from "../types";
import { grabAllAdjacentCells } from "./grabAdjacentCells";

export const createField = (): Cell[][] => {
  let field: Cell[][] = [];

  for (let row = 0; row < MAX_ROWS; row++) {
    field.push([]);
    for (let col = 0; col < MAX_COLS; col++) {
      field[row].push({
        value: CellValue.none,
        state: CellState.open,
      });
    }
  }

  let bombsPlaced = 0;
  while (bombsPlaced < BOMBS_NUM) {
    const y = Math.floor(Math.random() * MAX_ROWS);
    const x = Math.floor(Math.random() * MAX_COLS);

    if (field[y][x].value !== CellValue.bomb) {
      field = field.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (y === rowIndex && x === colIndex) {
            return {
              ...cell,
              value: CellValue.bomb,
            };
          }

          return cell;
        })
      );
      bombsPlaced++;
    }
  }
  for (let rowIndex = 0; rowIndex < MAX_ROWS; rowIndex++) {
    for (let colIndex = 0; colIndex < MAX_COLS; colIndex++) {
      const currentCell = field[rowIndex][colIndex];
      if (currentCell.value === CellValue.bomb) {
        continue;
      }

      let numberOfBombs = 0;

      const {
        topLeftCell,
        topCell,
        topRightCell,
        leftCell,
        rightCell,
        bottomLeftCell,
        bottomCell,
        bottomRightCell,
      } = grabAllAdjacentCells(field, rowIndex, colIndex);

      if (topLeftCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (topCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (topRightCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (leftCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (rightCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (bottomLeftCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (bottomCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (bottomRightCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }

      if (numberOfBombs > 0) {
        field[rowIndex][colIndex] = {
          ...currentCell,
          value: numberOfBombs,
        };
      }
    }
  }
  return field;
};
