import { MAX_COLS, MAX_ROWS, BOMBS_NUM } from "../constants";
import { CellState, CellValue, Cell } from "../types";

export const createField = (): Cell[][] => {
  let cells: Cell[][] = [];

  for (let row = 0; row < MAX_ROWS; row++) {
    cells.push([]);
    for (let col = 0; col < MAX_COLS; col++) {
      cells[row].push({
        value: CellValue.none,
        state: CellState.visible,
      });
    }
  }

  let bombsPlaced = 0;
  while (bombsPlaced < BOMBS_NUM) {
    const y = Math.floor(Math.random() * MAX_ROWS);
    const x = Math.floor(Math.random() * MAX_COLS);

    if (cells[y][x].value !== CellValue.bomb) {
      cells = cells.map((row, rowIndex) =>
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

  const inc = (x: number, y: number) => {
    if (x >= 0 && x < MAX_COLS && y >= 0 && y < MAX_ROWS) {
      if (cells[y][x].value === CellValue.bomb) return;

      cells[y][x].value += 1;
    }
  };

  for (let i = 0; i < MAX_ROWS; ) {
    const x = Math.floor(Math.random() * MAX_ROWS);
    const y = Math.floor(Math.random() * MAX_ROWS);

    if (cells[y][x].value === CellValue.bomb) continue;

    cells[y][x].value = CellValue.bomb;

    i += 1;
    inc(x + 1, y);
    inc(x - 1, y);
    inc(x, y + 1);
    inc(x, y - 1);
    inc(x + 1, y - 1);
    inc(x - 1, y - 1);
    inc(x + 1, y + 1);
    inc(x - 1, y + 1);
  }

  return cells;
};
