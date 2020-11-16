import React from 'react';

import ListItem from './index';

export default {
  title: 'Components/ListItem',
  component: ListItem,
};

const Template = (args) => <ListItem {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  id: 'https://en.wikipedia.org/wiki/AFDA,_The_School_for_the_Creative_Economy',
  label: 'Some result'
};