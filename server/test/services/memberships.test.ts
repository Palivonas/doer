import app from '../../src/app';
import { Membership } from '../../src/shared/entities';
import { expect } from 'chai';
import { givenUser, randomId } from '../utils';
import { Paginated } from '@feathersjs/feathers';

const service = app.service('memberships');

describe('memberships service', () => {

  it('should find memberships', async () => {
    const res = await service.find() as Paginated<Membership>;
    expect(res.data).to.be.an('array');
  });

  it('should create and get a membership', async () => {
    const { user, params } = await givenUser();

    const payload: Partial<Membership> = {
      activityId: randomId(),
    };

    const { _id } = await service.create(payload, params) as Membership;
    const membership = await service.get(_id);

    expect(membership.userId.toString()).to.equal(user._id.toString());
    expect(membership.activityId.toString()).to.equal(payload.activityId);
  });

  it('should populate user', async () => {
    const { user, params } = await givenUser();

    const activityId = randomId();

    const { _id } = await service.create({ activityId }, params) as Membership;
    const membership = await service.get(_id) as Membership;

    expect(membership.user!._id.toString()).to.equal(user._id);
    expect(membership.user!.name).to.equal(user.name);
  });
});
