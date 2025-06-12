import { ITransactionRepository } from "../../../domain/repository/Transsactionrepository";
import { IBookingRepository } from "../../../domain/repository/Bookingrepository";
import { ITransaction } from "../../../domain/models/Transactions";
import { IUser } from "../../../domain/models/User";


export class FetchTransactionsinTechWallet {
    constructor(private _transactionrepository: ITransactionRepository, private bookingrepository:IBookingRepository) {}

    async transactiondetails(techId: string) {
        console.log("techId",techId)
        try {
            const transactions=await this._transactionrepository.getbyTechnicianId(techId)
            console.log("transactions",transactions)
            return transactions
            } catch (error: any) {
              console.log(error.message);
              throw new Error('Failed to fetch transactions');
            }
          }
        }