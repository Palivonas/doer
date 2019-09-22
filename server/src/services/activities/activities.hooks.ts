import { authenticate } from '../../hooks/authenticate';
import { setUserId } from '../../hooks/set-user-id';
import { HookContext, Paginated } from '@feathersjs/feathers';
import { Activity, Membership } from '../../shared/entities';
import { disallow, getItems } from 'feathers-hooks-common';
import { Memberships } from '../memberships/memberships.class';

async function populateMemberCount(hook: HookContext<Activity | Activity[]>) {
  const result = getItems(hook);
  const items = (Array.isArray(result) ? result : [ result ]) as Activity[];
  await Promise.all(items.map(async (item: Activity) => {
    const res = await (hook.app.service('memberships') as Memberships).find({ limit: 0 }) as Paginated<Membership>;
    item.memberCount = res.total;
  }));
  return hook;
}

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [ authenticate, setUserId('createdById') ],
    update: [ authenticate ],
    patch: [ authenticate ],
    remove: [ authenticate ],
  },

  after: {
    all: [ populateMemberCount ],
    find: [],
    get: [],
    create: [],
    update: [ disallow('external') ],
    patch: [],
    remove: [ disallow('external') ]
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
