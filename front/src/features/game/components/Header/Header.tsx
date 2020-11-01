import React from "react";
import { Player, PlayerSide } from "../../types";

export interface HeaderProps {
  player: Player;
  side: PlayerSide;
}

export const Header = ({ player, side }: HeaderProps) => {
  return (
    <div>
      <h2>
        Ходит {player} - {side}
      </h2>
    </div>
  );
};
