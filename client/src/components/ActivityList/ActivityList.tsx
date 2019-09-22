import React from 'react';
import Activity from '../Activity/Activity';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

const activityList = (props: {
  activities: {
    avatarSrc: string;
    title: string;
    description: string;
    people: string[];
  }[]
}) =>
  <List>
    {
      props.activities.map(activity => 
        <React.Fragment>
          <Activity
            title={activity.title}
            description={activity.description}
            avatarSrc={activity.avatarSrc}
            people={activity.people}
          />
          <Divider variant="inset" component="li" />
        </React.Fragment>
        )
    }
  </List>;

export default activityList;