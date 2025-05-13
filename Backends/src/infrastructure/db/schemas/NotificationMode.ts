// domain/entities/Notification.ts (or in Mongoose model folder)

import { Schema, model, Types } from 'mongoose';

const NotificationSchema = new Schema({
  receiverId: { type: Types.ObjectId, required: true },
  receiverRole: { type: String, enum: ['user', 'technician'], required: true },  // 💡
  senderId: { type: Types.ObjectId, required: true },
  senderRole: { type: String, enum: ['user', 'technician'], required: true },    // 💡
  bookingId: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['message', 'alert'], default: 'message' },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});
export const NotificationModel = model('Notification', NotificationSchema);
