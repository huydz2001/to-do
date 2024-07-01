export enum STATUS {
  NOT_JOIN = 0,
  JOINED = 1,
  CREATED = 2,
}

export const USER_QUEUE = 'users-queue';
export const USER_EXCHANGE = 'users';
export const TASK_EXCHANGE = 'users';
export const USER_ROUTING_KEY = 'users-route';
export const TASK_ROUTING_KEY = 'tasks-route';

export const TYPE_EXCHANGE = 'topic';
