export enum CellValue {
  none,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  bomb,
}

export enum CellState {
  open,
  visible,
  flagged,
  questioned,
}

export type Cell = {
  value: CellValue;
  state: CellState;
};

export enum Face {
  smile = "😁",
  surprised = "😳",
  lost = "😩",
  won = "🤑",
}
