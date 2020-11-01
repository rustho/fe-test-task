import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import { Cell, CellProps } from "./Cell";
import { PlayerSide } from "../../types";

export default {
  title: "Cell",
  component: Cell,
} as Meta;

const Template: Story<CellProps> = (args) => <Cell {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  state: null,
};
export const Secondary = Template.bind({});
Secondary.args = {
  state: PlayerSide.cross,
};
export const Third = Template.bind({});
Third.args = {
  state: PlayerSide.nought,
};
