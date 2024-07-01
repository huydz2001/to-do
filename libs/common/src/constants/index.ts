export const USER_EXCHANGE = 'users';
export const TASK_EXCHANGE = 'tasks';

export const USER_QUEUE = 'users.#.*';
export const USER_FIND_QUEUE = 'users.find.*';
export const USER_CREATE_QUEUE = 'users.create.*';
export const USER_DELETE_QUEUE = 'users.delete.*';
export const USER_UPDATE_QUEUE = 'users.udpate.*';

export const TASK_QUEUE = 'tasks.#.*';

export const TYPE_EXCHANGE = 'topic';

export const USER_CREATE_USER_ROUTING_KEY = 'users.create.user';
export const USER_DELETE_USER_ROUTING_KEY = 'users.delete.user';
export const USER_UPDATE_USER_ROUTING_KEY = 'users.update.user';
export const USER_FIND_USER_ROUTING_KEY = 'users.find.user';
export const TASK_CREATE_TASK_ROUTING_KEY = 'tasks.create.task';
export const TASK_DELETE_TASK_ROUTING_KEY = 'tasks.delete.task';
export const TASK_UPDATE_TASK_ROUTING_KEY = 'tasks.update.task';
