export interface User {
  _id: string,
  name: string,
  imageUrl: string,
}

export interface Activity {
  _id: string,
  title: string,
  imageUrl: string,
  description: string,
  createdById: string,
}

export interface ChatMessage {
  _id: string,
  recipientId: string,
  senderId: string,
  text: string,
  createdDate: string | Date,
}

export interface Membership {
  _id: string,
  userId: string,
  activityId: string,
  createdAt: string,
}
