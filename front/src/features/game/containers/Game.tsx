import React, { useEffect } from "react";
import { Grid, Paper } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { Board } from "../components/Board/Board";
import { End } from "../components/End/End";
import { Header } from "../components/Header/Header";
import { Log } from "../components/Log/Log";
import {
  selectBoard,
  selectLogs,
  selectCurrentPlayer,
  moveAsync,
  newGameAsync,
  setGame,
  selectWinner,
  selectEnd,
  resetAsync,
} from "./GameSlice";
import styles from "./Game.module.css";

export const Game = () => {
  const board = useSelector(selectBoard);
  const logs = useSelector(selectLogs);
  const winner = useSelector(selectWinner);
  const isEnd = useSelector(selectEnd);
  const currentPlayer = useSelector(selectCurrentPlayer);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("/api/game")
      .then((response) => response.json())
      .then((json) => {
        if (json.ok) {
          dispatch(setGame({ ...json.result }));
        }
      });
  }, [dispatch]);

  const handleClick = (x: number, y: number) => {
    dispatch(moveAsync(x, y));
  };

  return (
    <Grid className={styles.grid} justify="space-between" container>
      <Grid item xs={12}>
        <Paper>
          <Header
            player={currentPlayer.player}
            side={currentPlayer.side}
          ></Header>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={7}>
        <Paper>
          <Board disabled={isEnd} onClick={handleClick} board={board}></Board>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper>
          <Log logs={logs}></Log>
        </Paper>
      </Grid>
      <End
        open={isEnd}
        winner={winner}
        onReset={() => dispatch(resetAsync())}
        onNewGame={() => dispatch(newGameAsync())}
      ></End>
    </Grid>
  );
};
