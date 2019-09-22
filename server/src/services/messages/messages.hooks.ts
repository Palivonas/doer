import { HookContext } from '@feathersjs/feathers';
import { ActivityMessage } from '../../shared/entities';
import { disallow, getItems } from 'feathers-hooks-common';
import { authenticate } from '../../hooks/authenticate';
import { setUserId } from '../../hooks/set-user-id';
// Don't remove this comment. It's needed to format import lines nicely.

async function populateUser(hook: HookContext<ActivityMessage | ActivityMessage[]>) {
  const result = getItems(hook);
  const items = (Array.isArray(result) ? result : [ result ]) as ActivityMessage[];
  await Promise.all(items.map(async (item: ActivityMessage) => {
    item.sender = await hook.app.service('users').get(item.senderId);
  }));
  return hook;
}

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [ authenticate, setUserId('senderId') ],
    update: [ disallow('external') ],
    patch: [ authenticate ],
    remove: [ disallow('external') ],
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
