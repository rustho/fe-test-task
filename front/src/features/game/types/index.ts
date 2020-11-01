export enum PlayerSide {
  cross = "X",
  nought = "O",
}

export enum Player {
  Player = "Игрок",
  AI = "ИИ",
}

export type CellType = null | PlayerSide.cross | PlayerSide.nought;

export interface LogInfo {
  player: Player;
  index: number;
}
