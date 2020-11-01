import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import { Board, BoardProps } from "./Board";
import { PlayerSide } from "../../types";

export default {
  title: "Board",
  component: Board,
} as Meta;

const Template: Story<BoardProps> = (args) => <Board {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  board: new Array(3).fill(new Array(3).fill(null)),
};
export const Secondary = Template.bind({});
Secondary.args = {
  board: new Array(3).fill(new Array(3).fill(PlayerSide.nought)),
};
