export interface User {
  id: string,
  name: string,
  imageUrl: string,
}

export interface Activity {
  id: string,
  title: string,
  imageUrl: string,
  description: string,
}

export interface ChatMessage {
  recipientId: string,
  senderId: string,
  text: string,
  createdDate: string | Date,
}

export interface Membership {
  userId: string,
  activityId: string,
  createdAt: string,
}
