import * as authentication from '@feathersjs/authentication';

const { authenticate: createHook } = authentication.hooks;

export const authenticate = createHook('jwt');
