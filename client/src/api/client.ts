import io from 'socket.io-client';
import feathers from '@feathersjs/client';
import { Activities } from '../../../server/src/services/activities/activities.class';

function createClient() {
  const socket = io('http://localhost:3030');
  const app = feathers();
  app.configure(feathers.socketio(socket));
  app.configure(feathers.authentication());

  const activities: Activities = app.service('activities');

  return {
    activities,
  };
}

export const client = createClient();
