import { DwarfBuilder } from '@dnd-js/core';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import RaceView from './RaceView';

const Story: ComponentMeta<typeof RaceView> = {
  component: RaceView,
  title: 'RaceView',
};
export default Story;

const Template: ComponentStory<typeof RaceView> = (args) => (
  <RaceView {...args} />
);

export const Dwarf = Template.bind({});
Dwarf.args = {
  race: DwarfBuilder.build(),
};
