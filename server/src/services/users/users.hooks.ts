import * as local from '@feathersjs/authentication-local';
import { disallow } from 'feathers-hooks-common';
import { authenticate } from '../../hooks/authenticate';
// Don't remove this comment. It's needed to format import lines nicely.

const { hashPassword, protect } = local.hooks;

function debug (context: any) {
  return context;
}

export default {
  before: {
    all: [],
    find: [ authenticate ],
    get: [ authenticate ],
    create: [ debug, hashPassword('password') ],
    update: [ hashPassword('password'),  authenticate ],
    patch: [ hashPassword('password'),  authenticate ],
    remove: [ disallow('external') ],
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password', 'facebookId'),
    ],
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
