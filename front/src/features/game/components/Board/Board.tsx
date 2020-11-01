import React from "react";
import Grid from "@material-ui/core/Grid";

import { CellType } from "../../types";
import { Cell } from "../Cell/Cell";
import styles from "./Board.module.css";

export interface BoardProps {
  board: CellType[][];
  onClick: (x: number, y: number) => void;
  disabled?: boolean;
}

export const Board = ({ board, onClick, disabled = false }: BoardProps) => {
  const handleClick = (x: number, y: number, disabled: boolean) => {
    if (!disabled) {
      onClick(x, y);
    }
  };
  return (
    <Grid container justify="center" spacing={1}>
      {board.map((row, i) => {
        return (
          <Grid key={`row_${i}`} container justify="center" item xs={12}>
            {row.map((cell, j) => {
              return (
                <div
                  key={`cell_${i}_${j}`}
                  onClick={() => handleClick(i, j, disabled || cell !== null)}
                  className={styles.cell}
                >
                  <Cell
                    disabled={disabled || cell !== null}
                    state={cell}
                  ></Cell>
                </div>
              );
            })}
          </Grid>
        );
      })}
    </Grid>
  );
};
