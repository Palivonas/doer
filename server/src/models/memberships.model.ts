import { Application } from '../declarations';
import { Membership } from '../shared/entities';
import { Document, Mongoose } from 'mongoose';
import { Types } from 'mongoose';

type MembershipsModel = Document & Membership;

export default function (app: Application) {
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const memberships = new Schema({
    userId: { type: Types.ObjectId, required: true, ref: 'users' },
    activityId: { type: Types.ObjectId, required: true, ref: 'activities' },
  }, {
    timestamps: true
  });

  return mongooseClient.model<MembershipsModel>('memberships', memberships);
}
