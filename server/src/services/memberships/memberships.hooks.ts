import { authenticate } from '../../hooks/authenticate';

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [ authenticate ],
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
