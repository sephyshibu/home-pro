import { INotification } from "../models/Notification";
export interface INotificationRepository {
  createNotification(data: INotification): Promise<void>;
  getUnreadByReceiver(receiverId: string): Promise<INotification[]>;
  markAllAsRead(receiverId: string): Promise<void>;
  deleteNotification(notificationId: string): Promise<void>;
  countUnreadNotifications(receiverId: string): Promise<number>;
  markNotificationAsRead(notificationId: string): Promise<void>;
}