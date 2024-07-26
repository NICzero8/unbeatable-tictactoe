import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import findBestMove, { evaluatePosition } from "../../app/minimax";

export interface GameState {
  unbeatable: boolean;
  gameOver: "win" | "loose" | "tie" | null;
  gameArray: ("X" | "O" | false)[];
  wins: number;
  unbeatableWins: number;
}

const initialState: GameState = {
  unbeatable: false, // changes depth of minimax algorithm
  gameOver: null,
  gameArray: [false, false, false, false, false, false, false, false, false],
  wins: localStorage.getItem("wins")
    ? JSON.parse(localStorage.getItem("wins")!)
    : 0,
  unbeatableWins: localStorage.getItem("unbeatableWins")
    ? JSON.parse(localStorage.getItem("unbeatableWins")!)
    : 0,
};

function checkWin(board: GameState["gameArray"]) {
  const score = evaluatePosition(board);
  if (score === -20) {
    return "win";
  }
  if (score === 20) {
    return "loose";
  }
  if (score === 0 && !board.includes(false)) {
    return "tie";
  }
  return null;
}

export const gameSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    changeDifficulty: (state) => {
      state.unbeatable = !state.unbeatable;
    },
    makeMove: (state, action: PayloadAction<number>) => {
      if (!state.gameOver) {
        state.gameArray[action.payload] = "X";
        state.gameOver = checkWin(state.gameArray);
        if (!state.gameOver) {
          state.gameArray[findBestMove(state.gameArray, state.unbeatable)] =
            "O";
          state.gameOver = checkWin(state.gameArray);
        }
      }
    },
    restart: (state) => {
      if (state.gameOver === "win") {
        if (state.unbeatable) {
          state.unbeatableWins += 1;
        } else {
          state.wins += 1;
        }
      }
      state.gameArray = initialState.gameArray;
      state.gameOver = initialState.gameOver;
    },
  },
});

export const { changeDifficulty, makeMove, restart } = gameSlice.actions;

export default gameSlice.reducer;
