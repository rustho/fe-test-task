import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import { Log, LogProps } from "./Log";
import { Player } from "../../types";

export default {
  title: "Log",
  component: Log,
} as Meta;

const Template: Story<LogProps> = (args) => <Log {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  logs: [
    {
      player: Player.AI,
      index: 2,
    },
  ],
};
