import { HookContext } from '@feathersjs/feathers';

export function setUserId(field: string) {
  return (hook: HookContext) => {
    if (!hook.data[field]) {
      hook.data[field] = hook.params.user._id.toString();
    }

    return hook;
  };
}
