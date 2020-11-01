import { Grid } from "@material-ui/core";
import React from "react";
import { Player, PlayerSide } from "../../../game/types";
import styles from "./GlobalScore.module.css";

export interface Score {
  side: Player | PlayerSide;
  win: number;
}

export interface GlobalScoreProps {
  sideResult: Array<Score>;
  globalResult: Array<Score>;
}

export const GlobalScore = ({ sideResult, globalResult }: GlobalScoreProps) => {
  return (
    <Grid className={styles.grid} justify="space-between" container>
      <Grid item xs={6}>
        {sideResult.map(({ side, win }) => (
          <h4 key={`side_${side}`}>
            {side} {"->"} {win}
          </h4>
        ))}
      </Grid>
      <Grid item xs={6}>
        {globalResult.map(({ side, win }) => (
          <h4 key={`player_${side}`}>
            {side} {"->"} {win}
          </h4>
        ))}
      </Grid>
    </Grid>
  );
};
