import { expect } from 'chai';
import { Paginated } from '@feathersjs/feathers';
import { ObjectID } from 'bson';

import app from '../../src/app';
import { Activities } from '../../src/services/activities/activities.class';
import { Activity } from '../../src/shared/entities';

const randomId = () => new ObjectID().toHexString();

describe('\'activities\' service', () => {
  let service: Activities;

  before(() => {
    service = app.service('activities');
  });

  it('registered the service', () => {
    expect(service, 'Registered the service').to.be.ok;
  });

  it('should get a list', async () => {
    const { data } = await service.find() as Paginated<Activity>;
    expect(data).to.be.an('array');
  });

  it('should create and get an activity', async () => {
    const payload: Omit<Activity, '_id'> = {
      title: 'Foosball',
      description: 'Some description',
      imageUrl: 'https://test.com/image.jpg',
      createdById: randomId(),
    };

    const { _id } = await service.create(payload) as Activity;
    const activity = await service.get(_id);

    expect(activity._id.toString()).to.equal(_id.toString());
    expect(activity.title).to.equal(payload.title);
    expect(activity.description).to.equal(payload.description);
    expect(activity.imageUrl).to.equal(payload.imageUrl);
  });
});
