import { ITransaction } from "../../../../domain/models/Transactions";
import { TransactionRepository } from "../../../../domain/repository/Transsactionrepository";

export class SearchTransaction{
    constructor(private _transactionrepository:TransactionRepository){}

    async SearchTransactionbybookingId(bookingId:string):Promise<ITransaction[]|null>{
        try {
            console.log("bookingId", bookingId)
            const bookingtransaction=await this._transactionrepository.getByBookingIdbySeatch(bookingId)
            return bookingtransaction
        } catch (error) {
             console.error("Error fetching booking:", error);
            return null;
        }
    }
}