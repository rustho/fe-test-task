import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import { GlobalScore, GlobalScoreProps } from "./GlobalScore";
import { Player, PlayerSide } from "../../../game/types";

export default {
  title: "GlobalScore",
  component: GlobalScore,
} as Meta;

const Template: Story<GlobalScoreProps> = (args) => <GlobalScore {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  globalResult: [
    { side: Player.AI, win: 0 },
    { side: Player.Player, win: 5 },
  ],
  sideResult: [
    { side: PlayerSide.cross, win: 0 },
    { side: PlayerSide.nought, win: 5 },
  ],
};
