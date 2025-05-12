import { TransactionRepository } from "../../../domain/repository/Transsactionrepository";

export class Gettransactions{
    constructor(private transactionrepository:TransactionRepository){}


    async gettransaction(){
        const transaction=await this.transactionrepository.fetchtransaction()
        console.log("transaction",transaction)
        if(!transaction) throw new Error("transaction not found")
            return transaction.map((tx) => {
                const booking = tx.referenceId as any;
                const user = booking?.userId as any;
              
                return {
                    _id:tx.id,
                  type: tx.type,
                  status: tx.status,
                  amount: tx.amount,
                  Name: user?.name || "N/A",
                  purpose: tx.purpose,
                  date: tx.createdAt?.toISOString() || "Unknown",
                  admincommission:tx.admincommission
                };
              });
        }
    }