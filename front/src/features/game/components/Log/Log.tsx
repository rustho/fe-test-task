import { List, ListItem } from "@material-ui/core";
import React from "react";
import { LogInfo } from "../../types";
import styles from "./Log.module.css";

export interface LogProps {
  logs: LogInfo[];
}

export const Log = ({ logs }: LogProps) => {
  return (
    <div className={styles.log}>
      <List>
        {logs.map(({ player, index }) => (
          <ListItem>
            Player {player} move {index}
          </ListItem>
        ))}
      </List>
    </div>
  );
};
