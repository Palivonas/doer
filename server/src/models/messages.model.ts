import { Application } from '../declarations';
import { ActivityMessage } from '../shared/entities';
import { Document, Mongoose } from 'mongoose';
import { Types } from 'mongoose';

type MessageModel = Document & ActivityMessage;

export default function (app: Application) {
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const messageSchema = new Schema({
    senderId: { type: Types.ObjectId, required: true, ref: 'users' },
    activityId: { type: Types.ObjectId, required: true, ref: 'activities' },
    text: { type: String, required: true },
  }, {
    timestamps: true,
  });

  return mongooseClient.model<MessageModel>('messages', messageSchema);
}
