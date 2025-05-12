
export interface IMessage {
    senderId:Object,
    receiverId:Object,
    message: string;
    timestamp: Date;
    bookingId: Object;
    isRead:Boolean
  }
  