import { Service as MongooseService, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';
import { User } from '../../shared/entities';
import { Paginated, Params } from '@feathersjs/feathers';

export class Users extends MongooseService<User> {
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }

  async find(params?: Params): Promise<Paginated<User>> {
    return await super.find(params) as Paginated<User>;
  }
}
