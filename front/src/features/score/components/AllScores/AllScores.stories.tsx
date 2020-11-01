import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import { AllScores, AllScoresProps } from "./AllScores";
import { Player, PlayerSide } from "../../../game/types";

export default {
  title: "AllScores",
  component: AllScores,
} as Meta;

const Template: Story<AllScoresProps> = (args) => <AllScores {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  scores: [
    {
      winner: Player.AI,
      team: PlayerSide.cross,
      time: new Date(1516027248097),
    },
    {
      winner: Player.AI,
      team: PlayerSide.cross,
      time: new Date(1516027293683),
    },
    {
      time: new Date(1516032453343),
    },
  ],
};
