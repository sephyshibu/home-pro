import { IMessage } from "../../domain/models/Message";
import { Messagerepository } from "../../domain/repository/Messagerepository";
import { MessageModel } from "../db/schemas/MessageModel";

export class MessagerepositoryImpl implements Messagerepository{


    async findByBookingId(bookingId: string): Promise<IMessage[]> {
      return MessageModel.find({ bookingId }).sort({ createdAt: 1 }).lean();
    }

    async save(message: IMessage): Promise<void> {
      await MessageModel.create({ ...message, createdAt: new Date(), isRead: false });
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
}