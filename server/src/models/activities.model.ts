// activities-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Activity } from '../shared/entities';
import { Document, Mongoose } from 'mongoose';
import { Types } from 'mongoose';

type ActivitiesModel = Document & Activity;

export default function (app: Application) {
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const activities = new Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    createdById: { type: Types.ObjectId, required: true },
    imageUrl: { type: String, required: true },
  }, {
    timestamps: true
  });

  return mongooseClient.model<ActivitiesModel>('activities', activities);
}
