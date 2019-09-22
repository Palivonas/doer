import { expect } from 'chai';
import { Paginated } from '@feathersjs/feathers';

import app from '../../src/app';
import { Activity } from '../../src/shared/entities';
import { givenUser, randomId } from '../utils';

const service = app.service('activities');

describe('activities service', () => {

  it('registered the service', () => {
    expect(service, 'Registered the service').to.be.ok;
  });

  it('should get a list', async () => {
    const { data } = await service.find() as Paginated<Activity>;
    expect(data).to.be.an('array');
  });

  it('should create and get an activity', async () => {
    const payload: Partial<Activity> = {
      title: 'Foosball',
      description: 'Some description',
      imageUrl: 'https://test.com/image.jpg',
    };

    const { user, params } = await givenUser();

    const { _id } = await service.create(payload, params) as Activity;
    const activity = await service.get(_id);

    expect(activity._id.toString()).to.equal(_id.toString());
    expect(activity.title).to.equal(payload.title);
    expect(activity.description).to.equal(payload.description);
    expect(activity.imageUrl).to.equal(payload.imageUrl);
    expect(activity.createdById.toString()).to.equal(user._id.toString());
  });
});
