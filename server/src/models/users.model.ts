// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';

export default function (app: Application) {
  const mongooseClient = app.get('mongooseClient');
  const users = new mongooseClient.Schema({
    email: { type: String, unique: true, lowercase: true },
    name: { type: String, required: true },
    password: { type: String },
    imageUrl: { type: String },
    facebookId: { type: String },
  }, {
    timestamps: true
  });

  return mongooseClient.model('users', users);
}
