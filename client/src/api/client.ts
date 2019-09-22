import io from 'socket.io-client';
import feathers from '@feathersjs/client';
import { Activities } from '../../../server/src/services/activities/activities.class';
import { Memberships } from '../../../server/src/services/memberships/memberships.class';
import { Users } from '../../../server/src/services/users/users.class';
import { Messages } from '../../../server/src/services/messages/messages.class';

function createClient() {
  const socket = io('http://localhost:3030');
  const app = feathers();
  app.configure(feathers.socketio(socket));
  app.configure(feathers.authentication());

  const activities: Activities = app.service('activities');
  const memberships: Memberships = app.service('memberships');
  const messages: Messages = app.service('messages');
  const users: Users = app.service('users');

  return {
    activities,
    memberships,
    messages,
    users,
  };
}

export const client = createClient();
