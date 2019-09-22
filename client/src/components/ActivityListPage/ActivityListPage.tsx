import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import ActivityList from '../ActivityList/ActivityList'
import Navbar from '../Navbar/Navbar'
import { client } from '../../api/client';

class ActivityListPage extends Component {
  state: {
    activities: {
      avatarSrc: string;
      title: string;
      description: string;
      people: string[];
    }[]
  } = {
    activities: []
  }

  async componentDidMount() {
    const { data: activities } = await client.activities.find();
    this.setState({
      activities: activities.map(activity => ({
        avatarSrc: activity.imageUrl,
        title: activity.title,
        description: activity.description,
        people: []
      }))
    });
  }

  render() {
    return <Container  maxWidth="md" >
        <Navbar />
        <div>Filters</div>
        <div>Can't find your activity? Create a new one</div>

        <ActivityList activities={this.state.activities}></ActivityList>
    
      </Container>;
  }
};

export default ActivityListPage;