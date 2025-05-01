export type TransactionType = 'CREDIT' | 'DEBIT';
export type PaymentStatus = 'success' | 'failed';
export type PaymentMethod = 'RazorPay' | 'Wallet';

export interface ITransaction {
  id?: string;
  ownerId: Object; // wallet id
  userType: 'user' | 'technician' | 'admin';
  referenceId: Object; // booking id
  type: TransactionType;
  method: PaymentMethod;
  status: PaymentStatus;
  purpose: string;
  amount: number;
  createdAt?: Date;
}
