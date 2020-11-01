import { createSlice } from "@reduxjs/toolkit";
import { fetchTo } from "../../../app/fetch";
import { AppThunk, RootState } from "../../../app/store";

interface LocalScore {
  winner?: string;
  team?: string;
  ts: number;
}

interface ScoreState {
  score: {
    ai: number;
    player: number;
    cross: number;
    nought: number;
  };
  list: Array<LocalScore>;
}

const initialState: ScoreState = {
  score: {
    ai: 0,
    player: 0,
    cross: 0,
    nought: 0,
  },
  list: [],
};

export const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    setScore: (state, action) => {
      const { ai, player, X: cross, O: nought, list } = action.payload;
      state.score = { ai, player, cross, nought };
      state.list = list;
    },
  },
});

export const { setScore } = scoreSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectScore = (state: RootState) => state.score.score;
export const selectList = (state: RootState) => state.score.list;

export const getScoreAsync = (): AppThunk => (dispatch) => {
  fetchTo("api/score", "GET", {}, (result) => {
    dispatch(setScore({ ...result }));
  });
};
export const resetScoreAsync = (): AppThunk => (dispatch) => {
  fetchTo("api/score/reset", "POST", {}, (result) => {
    dispatch(setScore({ ...result }));
  });
};

export default scoreSlice.reducer;
