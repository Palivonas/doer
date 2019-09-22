import app from '../../src/app';
import { Membership } from '../../src/shared/entities';
import { expect } from 'chai';
import { randomId } from '../utils';

const service = app.service('memberships');

describe('memberships service', () => {
  it('should create and get a membership', async () => {
    const payload: Omit<Membership, '_id'> = {
      userId: randomId(),
      activityId: randomId(),
    };

    const { _id } = await service.create(payload) as Membership;
    const membership = await service.get(_id);

    expect(membership._id.toString()).to.equal(_id.toString());
    expect(membership.userId.toString()).to.equal(payload.userId);
    expect(membership.activityId.toString()).to.equal(payload.activityId);
  });
});
