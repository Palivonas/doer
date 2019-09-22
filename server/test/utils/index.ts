import { ObjectID } from 'bson';
import { Application } from '../../src/declarations';
import { Activity, Membership, User, ActivityMessage } from '../../src/shared/entities';
import application from '../../src/app';
import { Mongoose } from 'mongoose';

const app: Application = application;

export const randomId = () => new ObjectID().toHexString();

export async function cleanDatabase() {
  const mongoose: Mongoose = app.get('mongooseClient');
  await mongoose.models.users.deleteMany({});
  await mongoose.models.activities.deleteMany({});
  await mongoose.models.memberships.deleteMany({});
  await mongoose.models.messages.deleteMany({});
}

export async function givenUser() {
  const userInfo: Omit<User, '_id'> = {
    email: `${randomId()}@${randomId()}.com`,
    name: 'Leeroy J.',
    imageUrl: 'https://i.imgur.com/M6HGB1l.jpg',
    password: 'supersecret',
  };

  const user = await app.service('users').create(userInfo) as User;

  return {
    user: {
      ...user,
      _id: user._id.toString(),
      password: userInfo.password,
    },
    params: getUserContextParams(user),
  };
}

function getUserContextParams(user: User) {
  return {
    user,
    provider: 'rest',
    authenticated: true,
  };
}

export async function givenActivity(createdById: string = randomId()): Promise<Activity> {
  const activityInfo: Partial<Activity> = {
    title: 'Foosball',
    description: 'Some description',
    imageUrl: 'https://test.com/image.jpg',
    createdById,
  };

  const activity = await app.service('activities').create(activityInfo) as Activity;
  return {
    ...activity,
    _id: activity._id.toString(),
  };
}

export async function givenMembership(activityId: string, userId: string = randomId()): Promise<Membership> {
  const membershipInfo: Partial<Membership> = {
    userId,
    activityId,
  };

  return await app.service('memberships').create(membershipInfo) as Membership;
}

export async function givenMessage(senderId: string, activityId: string): Promise<ActivityMessage> {
  const membershipInfo: Partial<ActivityMessage> = {
    senderId,
    activityId,
    text: 'Wow',
  };

  return await app.service('messages').create(membershipInfo) as ActivityMessage;
}
