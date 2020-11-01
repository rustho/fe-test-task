import React, { useState } from "react";
import "./App.css";
import { Game } from "./features/game/containers/Game";
import { ScoreComponent as Score } from "./features/score/containers/Score";
import { Paper, Tab, Tabs } from "@material-ui/core";

function TabPanel(props: any) {
  const { children, value, index } = props;

  return (
    <div hidden={value !== index} id={`simple-tabpanel-${index}`}>
      {value === index && <>{children}</>}
    </div>
  );
}

function App() {
  const [tab, setTab] = useState(0);

  return (
    <div className="App">
      <div style={{ padding: "30px" }}>
        <Paper square>
          <Tabs value={tab} onChange={(_, val) => setTab(val)}>
            <Tab label="Game" />
            <Tab label="Score" />
          </Tabs>
        </Paper>
      </div>
      <div style={{ padding: "30px" }}>
        <TabPanel value={tab} index={0}>
          <Game />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <Score />
        </TabPanel>
      </div>
    </div>
  );
}

export default App;
