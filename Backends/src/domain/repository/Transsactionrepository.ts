import { ITransaction } from "../models/Transactions";
export interface TransactionRepository {
    create(transaction: Omit<ITransaction, "id">): Promise<ITransaction>;
    getByOwnerId(ownerId: string): Promise<ITransaction[]>;
    fetchtransaction(page:number, limit:number):Promise<ITransaction[]>
    findById(id:string):Promise<ITransaction|null>
    getbyTechnicianId(techId:string):Promise<ITransaction[]|null>
    fetchtotaladminearning():Promise<number>
    getByBookingIdbySeatch(bookingId:string):Promise<ITransaction[]|null>
  }