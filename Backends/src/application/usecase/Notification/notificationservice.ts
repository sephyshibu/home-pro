import { INotification } from "../../../domain/models/Notification";
import { NotificationRepository } from "../../../infrastructure/repository/NotificationrepositoryImpl";

export class Notificationservice{
    constructor(private _notificationrepository:NotificationRepository){}

     async sendNotification(notificationData: INotification): Promise<void> {
    await this._notificationrepository.createNotification(notificationData);
  }

  // Get all unread notifications for a receiver
  async getUnreadNotifications(receiverId: string): Promise<INotification[]> {
    return await this._notificationrepository.getUnreadByReceiver(receiverId);
  }

  // Mark all notifications as read for a receiver
  async markAllNotificationsAsRead(receiverId: string): Promise<void> {
    await this._notificationrepository.markAllAsRead(receiverId);
  }

  // Count unread notifications for a receiver
  async countUnreadNotifications(receiverId: string): Promise<number> {
    return await this._notificationrepository.countUnreadNotifications(receiverId);
  }

  // Mark a single notification as read
  async markNotificationAsRead(notificationId: string): Promise<void> {
    await this._notificationrepository.markNotificationAsRead(notificationId);
  }
}
