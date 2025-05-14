import { IMessage } from "../../domain/models/Message";
import { Messagerepository } from "../../domain/repository/Messagerepository";
import { MessageModel } from "../db/schemas/MessageModel";
import { BookingModels } from "../db/schemas/BookingModel";
import mongoose from "mongoose";
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

  async getUnreadMessageCounts(userId: string): Promise<{ technicianName: string, bookingId: string, count: number }[]> {
  const objectId = new mongoose.Types.ObjectId(userId);

 const groupedCounts = await MessageModel.aggregate([
    {
      $match: {
        receiverId: objectId,
        isRead: false
      }
    },
    {
      $group: {
        _id: '$bookingId',
        count: { $sum: 1 }
      }
    }
  ]);

  // Step 2: For each bookingId, get the technician name
  const results = await Promise.all(groupedCounts.map(async (entry) => {
 const booking = await BookingModels.findById(entry._id).populate('technicianId', 'name');
    const technicianName = (booking?.technicianId as { name: string })?.name || 'Unknown Technician';

    return {
      bookingId: entry._id.toString(),
      count: entry.count,
      technicianName
    };
  }));

  return results;
}


  
}