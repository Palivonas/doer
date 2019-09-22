import React from 'react';
import { Container } from '@material-ui/core';
import ActivityList from '../ActivityList/ActivityList'
import Navbar from '../Navbar/Navbar'

const activityListPage = () => {
  return <Container  maxWidth="md" >
      <Navbar />
      <div>Filters</div>
      <div>Can't find your activity? Create a new one</div>

      <ActivityList></ActivityList>
  
    </Container>;
};

export default activityListPage;