import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTo } from "../../../app/fetch";
import { AppThunk, RootState } from "../../../app/store";
import { CellType, LogInfo, Player, PlayerSide } from "../types";

interface GameState {
  board: CellType[][];
  logs: LogInfo[];
  currentPlayer: { player: Player; side: PlayerSide };
  winner: null | Player;
  end: boolean;
}

const emptyBoard = () => {
  return new Array(3).fill(new Array(3).fill(null));
};

const initialState: GameState = {
  board: emptyBoard(),
  logs: [],
  currentPlayer: {
    player: Player.Player,
    side: PlayerSide.cross,
  },
  winner: null,
  end: false,
};

const changeSide = (side: PlayerSide): PlayerSide => {
  return side === PlayerSide.cross ? PlayerSide.nought : PlayerSide.cross;
};
const changePlayer = (player: Player): Player => {
  return player === Player.AI ? Player.Player : Player.AI;
};

export const cellIndex = (x: number, y: number) => {
  return x * 3 + y + 1;
};

type cellFromBackend = number | "O" | "X";

const parseBoard = (board: cellFromBackend[][]): CellType[][] => {
  return board.map((row, x) => {
    return row.map((cell, y) => {
      return parseFromBackend(cell);
    });
  });
};

const parseFromBackend = (x: cellFromBackend): CellType => {
  switch (x) {
    case "O":
      return PlayerSide.nought;
    case "X":
      return PlayerSide.cross;
    default:
      return null;
  }
};

const diffBoard = (prevBoard: CellType[][], currentBoard: CellType[][]) => {
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      if (prevBoard[x][y] !== currentBoard[x][y]) {
        return { x, y };
      }
    }
  }
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    newGame: (state, action: PayloadAction<any>) => {
      const { player } = action.payload;
      state.board = emptyBoard();
      state.logs = [];
      state.currentPlayer.side =
        player === "O" ? PlayerSide.nought : PlayerSide.cross;
      state.end = false;
      state.winner = null;
    },
    setBoard: (state, action: PayloadAction<any>) => {
      state.board = parseBoard(action.payload.board);
    },
    move: (state: GameState, action: PayloadAction<any>) => {
      const { x, y } = action.payload;

      state.board[x][y] = state.currentPlayer.side;
      state.logs = [
        ...state.logs,
        { player: state.currentPlayer.player, index: cellIndex(x, y) },
      ];
      // state.currentPlayer.side = changeSide(state.currentPlayer.side);
      // state.currentPlayer.player = changePlayer(state.currentPlayer.player);
    },
    setLog: (state: GameState, action: PayloadAction<any>) => {
      const { board: newBoard } = action.payload;
      const { board: prevBoard, currentPlayer: player } = state;
      const diff = diffBoard(prevBoard, newBoard);
      if (diff) {
        state.logs = [
          ...state.logs,
          { player: player.player, index: cellIndex(diff.x, diff.y) },
        ];
      }
    },
    endGame: (state: GameState, action: PayloadAction<any>) => {
      const { winner } = action.payload;
      state.end = true;
      state.winner = winner
        ? winner === "ai"
          ? Player.AI
          : Player.Player
        : null;
    },
    nextPlayer: (state: GameState) => {
      const { player, side } = state.currentPlayer;
      state.currentPlayer = {
        player: changePlayer(player),
        side: changeSide(side),
      };
    },
    setPlayer: (state, action) => {
      const { player } = action.payload;
      state.currentPlayer.side =
        player === "O" ? PlayerSide.nought : PlayerSide.cross;
    },
    setGame: (state, action) => {
      const { player, board, end, winner } = action.payload;
      if (end) {
        state.end = true;
        state.winner = winner
          ? winner === "ai"
            ? Player.AI
            : Player.Player
          : null;
      }
      state.currentPlayer.side =
        player === "O" ? PlayerSide.nought : PlayerSide.cross;
      state.board = parseBoard(board);
    },
  },
});

export const {
  setBoard,
  move,
  newGame,
  endGame,
  setLog,
  nextPlayer,
  setPlayer,
  setGame,
} = gameSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectBoard = (state: RootState) => state.game.board;
export const selectLogs = (state: RootState) => state.game.logs;
export const selectWinner = (state: RootState) => state.game.winner;
export const selectEnd = (state: RootState) => state.game.end;
export const selectCurrentPlayer = (state: RootState) =>
  state.game.currentPlayer;

export const moveAsync = (x: number, y: number): AppThunk => (dispatch) => {
  dispatch(move({ x, y, player: Player.Player }));
  dispatch(nextPlayer());
  fetchTo("/api/game/move", "POST", { index: cellIndex(x, y) }, (result) => {
    const { board, end, winner, player, nextMove } = result;
    if (end) dispatch(endGame({ winner }));
    const currentPlayer = nextMove === player ? Player.Player : Player.AI;
    dispatch(setLog({ board: parseBoard(board), player: currentPlayer }));
    dispatch(setBoard({ board: parseBoard(result.board) }));
    dispatch(nextPlayer());
  });
};

export const newGameAsync = (): AppThunk => (dispatch) => {
  fetchTo("/api/game/next", "GET", {}, (result) => {
    dispatch(newGame({ player: result.player }));
    dispatch(setBoard({ board: parseBoard(result.board) }));
  });
};

export const resetAsync = (): AppThunk => (dispatch) => {
  fetchTo("/api/game/reset", "POST", {}, (result) => {
    dispatch(newGame({ player: result.nextMove }));
    dispatch(setBoard({ board: result.board }));
  });
};

export default gameSlice.reducer;
