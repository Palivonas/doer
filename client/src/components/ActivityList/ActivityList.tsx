import React from 'react';
import Activity from '../Activity/Activity';
import List from '@material-ui/core/List';

const activityList = () =>
  <List>
    <Activity />
    <Activity />
  </List>;

export default activityList;