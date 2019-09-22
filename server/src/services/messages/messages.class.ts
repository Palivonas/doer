import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';
import { ActivityMessage } from '../../shared/entities';

export class Messages extends Service<ActivityMessage> {
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }
}
