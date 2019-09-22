import { expect } from 'chai';
import { Paginated } from '@feathersjs/feathers';

import app from '../../src/app';
import { Activity } from '../../src/shared/entities';
import { cleanDatabase, givenActivity, givenMembership, givenUser } from '../utils';

const service = app.service('activities');

describe('activities service', () => {

  beforeEach(async () => {
    await cleanDatabase();
  });

  it('registered the service', () => {
    expect(service, 'Registered the service').to.be.ok;
  });

  it('should get a list', async () => {
    const activity1 = await givenActivity();
    const activity2 = await givenActivity();

    const { data } = await service.find() as Paginated<Activity>;

    expect(data).to.be.an('array');
    const ids = data.map(activity => activity._id.toString());
    expect(ids).to.have.members([activity1._id, activity2._id]);
  });

  it('should populate memberCount in find', async () => {
    const mockActivity = await givenActivity();
    await givenMembership(mockActivity._id);
    await givenMembership(mockActivity._id);

    const res = await service.find() as Paginated<Activity>;
    const [ activity ] = res.data;

    expect(activity.memberCount).to.equal(2);
  });

  it('should populate memberCount in get', async () => {
    const mockActivity = await givenActivity();
    await givenMembership(mockActivity._id);
    await givenMembership(mockActivity._id);
    await givenMembership(mockActivity._id);

    const activity = await service.get(mockActivity._id) as Activity;

    expect(activity.memberCount).to.equal(3);
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
