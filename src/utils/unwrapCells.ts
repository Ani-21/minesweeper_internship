import { CellState, CellValue, Cell } from "../types";
import { grabAllAdjacentCells } from "./grabAdjacentCells";

export const unwrapCells = (
  field: Cell[][],
  rowParam: number,
  colParam: number
): Cell[][] => {
  let fieldCopy = field.slice();
  const currentCell = field[rowParam][colParam];

  fieldCopy[rowParam][colParam].state = CellState.visible;

  const {
    topLeftCell,
    topCell,
    topRightCell,
    leftCell,
    rightCell,
    bottomLeftCell,
    bottomCell,
    bottomRightCell,
  } = grabAllAdjacentCells(field, rowParam, colParam);

  if (
    topLeftCell?.state === CellState.open &&
    topLeftCell.value !== CellValue.bomb
  ) {
    if (topLeftCell.value === CellValue.none) {
      field = unwrapCells(field, rowParam - 1, colParam - 1);
    } else {
      field[rowParam - 1][colParam - 1].state = CellState.visible;
    }
  }

  if (topCell?.state === CellState.open && topCell.value !== CellValue.bomb) {
    if (topCell.value === CellValue.none) {
      field = unwrapCells(field, rowParam - 1, colParam);
    } else {
      field[rowParam - 1][colParam].state = CellState.visible;
    }
  }

  if (
    topRightCell?.state === CellState.open &&
    topRightCell.value !== CellValue.bomb
  ) {
    if (topRightCell.value === CellValue.none) {
      field = unwrapCells(field, rowParam - 1, colParam + 1);
    } else {
      field[rowParam - 1][colParam + 1].state = CellState.visible;
    }
  }

  if (leftCell?.state === CellState.open && leftCell.value !== CellValue.bomb) {
    if (leftCell.value === CellValue.none) {
      field = unwrapCells(field, rowParam, colParam - 1);
    } else {
      field[rowParam][colParam - 1].state = CellState.visible;
    }
  }

  if (
    rightCell?.state === CellState.open &&
    rightCell.value !== CellValue.bomb
  ) {
    if (rightCell.value === CellValue.none) {
      field = unwrapCells(field, rowParam, colParam + 1);
    } else {
      field[rowParam][colParam + 1].state = CellState.visible;
    }
  }

  if (
    bottomLeftCell?.state === CellState.open &&
    bottomLeftCell.value !== CellValue.bomb
  ) {
    if (bottomLeftCell.value === CellValue.none) {
      field = unwrapCells(field, rowParam + 1, colParam - 1);
    } else {
      field[rowParam + 1][colParam - 1].state = CellState.visible;
    }
  }

  if (
    bottomCell?.state === CellState.open &&
    bottomCell.value !== CellValue.bomb
  ) {
    if (bottomCell.value === CellValue.none) {
      field = unwrapCells(field, rowParam + 1, colParam);
    } else {
      field[rowParam + 1][colParam].state = CellState.visible;
    }
  }

  if (
    bottomRightCell?.state === CellState.open &&
    bottomRightCell.value !== CellValue.bomb
  ) {
    if (bottomRightCell.value === CellValue.none) {
      field = unwrapCells(field, rowParam + 1, colParam + 1);
    } else {
      field[rowParam + 1][colParam + 1].state = CellState.visible;
    }
  }

  return field;
};
