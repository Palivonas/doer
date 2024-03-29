import { Application } from '../declarations';
import users from './users/users.service';
import activities from './activities/activities.service';
import memberships from './memberships/memberships.service';
import messages from './messages/messages.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application) {
  app.configure(users);
  app.configure(activities);
  app.configure(memberships);
  app.configure(messages);
}
