
export interface SendMessageDTO {
  senderId: string;
  receiverId: string;
  message: string;
  bookingId: string;
}


export interface UpdateMessageStatusDTO {
  messageId: string;
  status: 'sent' | 'delivered' | 'seen';
}
