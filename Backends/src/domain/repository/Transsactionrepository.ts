import { ITransaction } from "../models/Transactions";
export interface TransactionRepository {
    create(transaction: Omit<ITransaction, "id">): Promise<ITransaction>;
    getByOwnerId(ownerId: string): Promise<ITransaction[]>;
    fetchtransaction():Promise<ITransaction[]>
    findById(id:string):Promise<ITransaction|null>
    getbyTechnicianId(techId:string):Promise<ITransaction[]|null>
  }