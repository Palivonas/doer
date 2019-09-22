import React from 'react';
import { Container } from '@material-ui/core';
import ActivityList from '../ActivityList/ActivityList'

const activityListPage = () => {
  return <Container 
      maxWidth="md"
      style={{
        backgroundColor: "grey"
      }}
    >
      <div>Filters</div>
      <div>Can't find your activity? Create a new one</div>

      <ActivityList></ActivityList>
  
    </Container>;
};

export default activityListPage;