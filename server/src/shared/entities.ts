export interface User {
  _id: string,
  name: string,
  email: string,
  imageUrl: string,
  password?: string,
}

export interface Activity {
  _id: string,
  title: string,
  imageUrl: string,
  description: string,
  createdById: string,
  memberCount: number,
}

export interface ChatMessage {
  _id: string,
  recipientId: string,
  senderId: string,
  text: string,
  createdAt: string | Date,
}

export interface Membership {
  _id: string,
  userId: string,
  activityId: string,
  user?: User,
}
