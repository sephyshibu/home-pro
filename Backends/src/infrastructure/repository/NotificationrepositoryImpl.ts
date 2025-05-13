import { NotificationModel } from "../db/schemas/NotificationMode";
import { INotificationRepository } from "../../domain/repository/Notificationrepository";
import { INotification } from "../../domain/models/Notification";


export class NotificationRepository implements INotificationRepository {
  // Create a new notification
  async createNotification(data: INotification): Promise<void> {
    await NotificationModel.create(data);
  }

  // Get unread notifications for a specific receiver
  async getUnreadByReceiver(receiverId: string): Promise<INotification[]> {
    // Use lean() to return plain objects, and cast the result to INotification[]
    return await NotificationModel.find({ receiverId, read: false })
      .sort({ createdAt: -1 })
      .lean() as INotification[];
  }


  // Mark all notifications as read for a specific receiver
  async markAllAsRead(receiverId: string): Promise<void> {
    await NotificationModel.updateMany({ receiverId, read: false }, { $set: { read: true } });
  }

  // Delete a notification
  async deleteNotification(notificationId: string): Promise<void> {
    await NotificationModel.findByIdAndDelete(notificationId);
  }

  // Count unread notifications for a specific receiver
  async countUnreadNotifications(receiverId: string): Promise<number> {
    return await NotificationModel.countDocuments({ receiverId, read: false });
  }

  // Mark a specific notification as read by its ID
  async markNotificationAsRead(notificationId: string): Promise<void> {
    await NotificationModel.findByIdAndUpdate(notificationId, { read: true });
  }
}