import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';
import { Membership } from '../../shared/entities';

export class Memberships extends Service<Membership> {
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }
}
