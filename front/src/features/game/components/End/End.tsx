import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Player } from "../../types";

export interface EndProps {
  onNewGame: () => void;
  onReset: () => void;
  open: boolean;
  winner: Player | null;
}

export const End = ({ onNewGame, onReset, open, winner }: EndProps) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Победа</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {winner === null && "Ничья"}
          {winner === Player.AI && "Победил АИ"}
          {winner === Player.Player && "Победил Игрок"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onReset} color="primary">
          Reset
        </Button>
        <Button onClick={onNewGame} color="primary" autoFocus>
          New Game
        </Button>
      </DialogActions>
    </Dialog>
  );
};
