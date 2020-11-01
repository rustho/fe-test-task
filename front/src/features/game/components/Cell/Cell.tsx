import { Paper } from "@material-ui/core";
import React from "react";
import { CellType, PlayerSide } from "../../types";
import styles from "./Cell.module.css";

export interface CellProps {
  state: CellType;
  disabled: boolean;
}

const sign = (sign: CellType) => {
  switch (sign) {
    case PlayerSide.nought:
      return <>o</>;
    case PlayerSide.cross:
      return <>x</>;
    default:
      return <></>;
  }
};

export const Cell = ({ state, disabled }: CellProps) => {
  return (
    <Paper
      className={styles.cell}
      style={{ background: disabled ? "#666" : "#dfdfdf" }}
      square
    >
      {sign(state)}
    </Paper>
  );
};
