import { Button, Grid, Paper } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Player, PlayerSide } from "../../game/types";
import { AllScores, Score } from "../components/AllScores/AllScores";
import { GlobalScore } from "../components/GlobalScore/GlobalScore";
import {
  selectScore,
  selectList,
  getScoreAsync,
  resetScoreAsync,
} from "./ScoreSlice";
import styles from "./Score.module.css";

export const ScoreComponent = () => {
  const score = useSelector(selectScore);
  const list = useSelector(selectList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getScoreAsync());
  }, [dispatch]);

  const globalResult = [
    { side: Player.AI, win: score.ai },
    { side: Player.Player, win: score.player },
  ];
  const sideResult = [
    { side: PlayerSide.cross, win: score.cross },
    { side: PlayerSide.nought, win: score.nought },
  ];

  const scores = list.map((item) => ({
    winner: item.winner
      ? item.winner === "player"
        ? Player.Player
        : Player.AI
      : undefined,
    team: item.team
      ? item.team === "O"
        ? PlayerSide.cross
        : PlayerSide.nought
      : undefined,
    time: new Date(item.ts),
  })) as Array<Score>;

  return (
    <Grid className={styles.grid} justify="space-between" container spacing={3}>
      <Grid item xs={12}>
        <Paper>
          <Button
            onClick={() => {
              dispatch(resetScoreAsync());
            }}
          >
            Сбросить
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <GlobalScore
            sideResult={sideResult}
            globalResult={globalResult}
          ></GlobalScore>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <AllScores scores={scores}></AllScores>
        </Paper>
      </Grid>
    </Grid>
  );
};
