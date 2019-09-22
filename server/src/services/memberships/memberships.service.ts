// Initializes the `memberships` service on path `/memberships`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Memberships } from './memberships.class';
import createModel from '../../models/memberships.model';
import hooks from './memberships.hooks';
import { Membership } from '../../shared/entities';

// Add this service to the service type index
declare module '../../declarations' {

  interface ServiceTypes {
    'memberships': Memberships & ServiceAddons<Membership>;
  }
}

export default function (app: Application) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/memberships', new Memberships(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('memberships');

  service.hooks(hooks);
}
