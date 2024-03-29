// Initializes the `users` service on path `/users`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application, ServiceTypes } from '../../declarations';
import { Users } from './users.class';
import createModel from '../../models/users.model';
import hooks from './users.hooks';
import { User } from '../../shared/entities';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'users': Users & ServiceAddons<User>;
  }
}

export default function (app: Application) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate,
  };

  // Initialize our service with any options it requires
  app.use('/users', new Users(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('users');

  service.hooks(hooks);
}
