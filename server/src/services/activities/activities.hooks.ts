import { authenticate } from '../../hooks/authenticate';
import { setUserId } from '../../hooks/set-user-id';

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
    all: [],
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
