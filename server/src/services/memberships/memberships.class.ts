import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';
import { Membership } from '../../shared/entities';
import { Paginated, Params } from '@feathersjs/feathers';

export class Memberships extends Service<Membership> {
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }

  async find(params?: Params): Promise<Paginated<Membership>> {
    return await super.find(params) as Paginated<Membership>;
  }
}
