import { IMessage } from "../../domain/models/Message";
import { Messagerepository } from "../../domain/repository/Messagerepository";
import { MessageModel } from "../db/schemas/MessageModel";

export class MessagerepositoryImpl implements Messagerepository{


    async findByBookingId(bookingId: string): Promise<IMessage[]> {
      return MessageModel.find({ bookingId }).sort({ createdAt: 1 }).lean();
    }

    async save(data: IMessage): Promise<IMessage> {
      const saved = await MessageModel.create({
      senderId: data.senderId,
      receiverId: data.receiverId,
      message: data.message,
      isRead: false,
      timestamp: new Date(),
      bookingId: data.bookingId,
    });
    return saved.toObject();
    }

    async markmessageasReadByBooking(bookingId: string): Promise<void> {
      await MessageModel.updateMany(
        { bookingId, isRead: false },
        { $set: { isRead: true } }
      );
    }

    async markmessageasReadByMessageId(messageId: string): Promise<void> {
      await MessageModel.updateOne(
        { _id: messageId },
        { $set: { isRead: true } }
      );
    }

      async countUnreadMessages(bookingId: string, receiverId: string): Promise<number> {
    return MessageModel.countDocuments({
      bookingId,
      receiverId,
      isRead: false
    });
  }

  async markMessagesAsRead(bookingId: string, receiverId: string): Promise<void> {
    await MessageModel.updateMany(
      { bookingId, receiverId, isRead: false },
      { $set: { isRead: true } }
    );
  }

  async getUnreadMessageCounts(userId: string): Promise<{ bookingId: string, count: number }[]> {
    
    const counts = await MessageModel.aggregate([
      {
        $match: {
          receiverId: userId,
          isRead: false
        }
      },
      {
        $group: {
          _id: '$bookingId',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          bookingId: '$_id',
          count: 1,
          _id: 0
        }
      }
    ]);

    return counts;
  }

  
}