import { authenticate } from '../../hooks/authenticate';
import { setUserId } from '../../hooks/set-user-id';
import { Membership } from '../../shared/entities';
import { getItems } from 'feathers-hooks-common';
import { HookContext } from '@feathersjs/feathers';

async function populateUser(hook: HookContext<Membership | Membership[]>) {
  const result = getItems(hook);
  const items = (Array.isArray(result) ? result : [ result ]) as Membership[];
  await Promise.all(items.map(async (item: Membership) => {
    item.user = await hook.app.service('users').get(item.userId);
  }));
  return hook;
}

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [ authenticate, setUserId('userId') ],
    update: [ authenticate ],
    patch: [ authenticate ],
    remove: [ authenticate ],
  },

  after: {
    all: [ populateUser ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
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
