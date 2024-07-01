import { ObjectId } from 'mongoose';

export interface IMessage {
  Id: ObjectId;
  Type: string;
  Data: object;
  DateTimeOffset: Date;
}
