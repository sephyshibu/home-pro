

export interface INotification {
  _id?: Object;               // Unique identifier for the notification
  receiverId: Object;         // Receiver's ID (user or technician)
  receiverRole: 'user' | 'technician'; // Role of the receiver (user or technician)
  senderId: Object;           // Sender's ID (user or technician)
  senderRole: 'user' | 'technician';  // Role of the sender (user or technician)
  bookingId: string;                  // Associated booking ID
  message: string;                    // The content of the notification
  type: 'message' | 'alert';          // Type of notification (message or alert)
  read: boolean;                      // Whether the notification has been read
  createdAt: Date;                    // Date when the notification was created
}
