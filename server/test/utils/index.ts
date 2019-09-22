import { ObjectID } from 'bson';
import { Application } from '../../src/declarations';
import { User } from '../../src/shared/entities';
import application from '../../src/app';
import { Mongoose } from 'mongoose';

const app: Application = application;

export const randomId = () => new ObjectID().toHexString();

export async function cleanDatabase() {
  const mongoose: Mongoose = app.get('mongooseClient');
  await mongoose.models.users.deleteMany({});
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
      password: userInfo.password,
    },
    params: getUserContextParams(user),
  };
}

export function getUserContextParams(user: User) {
  return {
    user,
    provider: 'rest',
    authenticated: true,
  };
}
