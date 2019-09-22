import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';
import { Activity } from '../../shared/entities';
import { Paginated, Params } from '@feathersjs/feathers';

export class Activities extends Service<Activity> {
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }

  async find(params?: Params): Promise<Paginated<Activity>> {
    return await super.find(params) as Paginated<Activity>;
  }
}
