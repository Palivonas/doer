import { Service as MongooseService, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';
import { User } from '../../shared/entities';

export class Users extends MongooseService<User> {
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }
}
