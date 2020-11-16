import React from 'react';
import moxios from 'moxios';

import Page from './index';

moxios.install();

moxios.stubRequest('https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=fad&limit=50', {
  status: 200,
  response: ["fad",["Fad","Fad diet","Faded (Alan Walker song)","Fade (audio engineering)","FADD","Fading affect bias","Fade to Grey (Visage song)","Fade (Kanye West song)","Fadeout (Arrow)","Fad Gadget"],["","","","","","","","","",""],["https://en.wikipedia.org/wiki/Fad","https://en.wikipedia.org/wiki/Fad_diet","https://en.wikipedia.org/wiki/Faded_(Alan_Walker_song)","https://en.wikipedia.org/wiki/Fade_(audio_engineering)","https://en.wikipedia.org/wiki/FADD","https://en.wikipedia.org/wiki/Fading_affect_bias","https://en.wikipedia.org/wiki/Fade_to_Grey_(Visage_song)","https://en.wikipedia.org/wiki/Fade_(Kanye_West_song)","https://en.wikipedia.org/wiki/Fadeout_(Arrow)","https://en.wikipedia.org/wiki/Fad_Gadget"]]
});

moxios.stubRequest('https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=fadsfasdf&limit=50', {
  status: 200,
  response: ["fadsfasdf",[],[],[]]
});

export default {
  title: 'Pages/Search',
  component: Page,
};

const Template = (args) => <Page {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  location: {
    search: '?query=fad'
  }
};

export const NoData = Template.bind({});
NoData.args = {
  location: {
    search: '?query=fadsfasdf'
  }
};