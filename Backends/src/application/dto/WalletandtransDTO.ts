
export interface CreateTransactionDTO {
  userId: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  bookingId?: string;
}


export interface RefundRequestDTO {
  bookingId: string;
  reason: string;
}
