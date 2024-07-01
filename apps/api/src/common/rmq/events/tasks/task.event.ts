import { ITaskEvent } from 'apps/api/src/interfaces';
import { Schema } from 'mongoose';

export class CreateTaskEvent implements ITaskEvent {
  Id: Schema.Types.ObjectId;
  Type: string;
  Data: object;
  DateTimeOffset: Date;
}
