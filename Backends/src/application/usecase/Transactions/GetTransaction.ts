import { ITransactionRepository } from "../../../domain/repository/Transsactionrepository";

export class Gettransactions{
    constructor(private _transactionrepository:ITransactionRepository){}


    async gettransaction(currentpage:number){
        const limit=5
        const transaction=await this._transactionrepository.fetchtransaction(currentpage, limit)
        const totaladmincommision=await this._transactionrepository.fetchtotaladminearning()

        console.log("transaction",transaction)
        if(!transaction) throw new Error("transaction not found")
            const formatted= transaction.map((tx) => {
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
               return {
                transactions: formatted,
                totaladmincommision
              };
        }
    }