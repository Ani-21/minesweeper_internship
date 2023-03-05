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
  wrong,
  questioned,
}

export type Cell = {
  value: CellValue;
  state: CellState;
  red?: boolean;
};

export enum Face {
  smile = "smile",
  surprised = "surprised",
  lost = "lost",
  won = "won",
}
