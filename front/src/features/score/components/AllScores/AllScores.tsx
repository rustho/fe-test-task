import { List, ListItem } from "@material-ui/core";
import React from "react";
import { Player, PlayerSide } from "../../../game/types";
import styles from "./AllScores.module.css";

export interface Score {
  winner?: Player;
  team?: PlayerSide;
  time: Date;
}

export interface AllScoresProps {
  scores: Array<Score>;
}

export const AllScores = ({ scores }: AllScoresProps) => {
  return (
    <List className={styles.allScores}>
      {scores
        .sort((a, b) => (a.time < b.time ? 1 : -1))
        .map(({ winner, team, time }) => {
          const localeTime = new Date(time).toLocaleTimeString();
          if (winner) {
            return (
              <ListItem key={`item_${localeTime}`} className={styles.item}>
                Победа {winner} за {team} в {localeTime}
              </ListItem>
            );
          }
          return (
            <ListItem key={`item_${localeTime}`} className={styles.item}>
              Ничья в {localeTime}
            </ListItem>
          );
        })}
    </List>
  );
};
