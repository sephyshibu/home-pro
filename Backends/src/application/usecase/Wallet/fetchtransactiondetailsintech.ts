import { TransactionRepository } from "../../../domain/repository/Transsactionrepository";
import { BookingRepository } from "../../../domain/repository/Bookingrepository";
import { ITransaction } from "../../../domain/models/Transactions";
import { IUser } from "../../../domain/models/User";


export class FetchTransactionsinTechWallet {
    constructor(private transactionrepository: TransactionRepository, private bookingrepository:BookingRepository) {}

    async transactiondetails(techId: string) {
        console.log("techId",techId)
        try {
            const transactions=await this.transactionrepository.getbyTechnicianId(techId)
            console.log("transactions",transactions)
            return transactions
            } catch (error: any) {
              console.log(error.message);
              throw new Error('Failed to fetch transactions');
            }
          }
        }