import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';
import { ActivityMessage } from '../../shared/entities';
import { Paginated, Params } from '@feathersjs/feathers';

export class Messages extends Service<ActivityMessage> {
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }

  async find(params?: Params): Promise<Paginated<ActivityMessage>> {
    return await super.find(params) as Paginated<ActivityMessage>;
  }
}
