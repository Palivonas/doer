import React from 'react';
import Activity from '../Activity/Activity';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

const activityList = () =>
  <List>
    <Activity 
      title="First activity"
      description="Description of activity"
      avatarSrc="http://localhost:3000/static/media/welcome-background.8ff711bd.jpg"
      people={["Dude1", "Dude2"]}
    />
    <Divider variant="inset" component="li" />
    <Activity
      title="First activity"
      description="Description of activity"
      avatarSrc="http://localhost:3000/static/media/welcome-background.8ff711bd.jpg"
      people={["Dude1", "Dude2"]}
    />
  </List>;

export default activityList;