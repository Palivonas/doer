import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';
import { Activity } from '../../shared/entities';

export class Activities extends Service<Activity> {
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }
}
