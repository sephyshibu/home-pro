import { ITransaction } from "../models/Transactions";
export interface TransactionRepository {
    create(transaction: Omit<ITransaction, "id">): Promise<ITransaction>;
    getByOwnerId(ownerId: string): Promise<ITransaction[]>;
  }