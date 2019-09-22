import app from '../../src/app';
import { ActivityMessage } from '../../src/shared/entities';
import { expect } from 'chai';
import { cleanDatabase, givenUser, givenActivity, givenMessage } from '../utils';
import { Paginated } from '@feathersjs/feathers';

const service = app.service('messages');

describe('messages service', () => {

  beforeEach(async () => {
    await cleanDatabase();
  });

  it('should find messages', async () => {
    const res = await service.find() as Paginated<ActivityMessage>;
    expect(res.data).to.be.an('array');
  });

  it('should create and get a message', async () => {
    const { user, params } = await givenUser();
    const activity = await givenActivity();

    const payload: Partial<ActivityMessage> = {
      activityId: activity._id,
      text: 'Ipsum my lorem baby',
    };

    const { _id } = await service.create(payload, params) as ActivityMessage;
    const message = await service.get(_id);

    expect(message.senderId.toString()).to.equal(user._id);
    expect(message.activityId.toString()).to.equal(payload.activityId);
    expect(message.text).to.equal(payload.text);
  });

  it('should populate user in get', async () => {
    const { user } = await givenUser();
    const activity = await givenActivity();
    const { _id } = await givenMessage(user._id, activity._id);

    const message = await service.get(_id) as ActivityMessage;

    expect(message.sender!._id.toString()).to.equal(user._id);
    expect(message.sender!.name).to.equal(user.name);
  });

  it('should populate user in find', async () => {
    const { user } = await givenUser();
    const activity = await givenActivity();
    await givenMessage(user._id, activity._id);

    const { data: [ message ] } = await service.find({}) as Paginated<ActivityMessage>;

    expect(message.sender!._id.toString()).to.equal(user._id);
    expect(message.sender!.name).to.equal(user.name);
  });
});
