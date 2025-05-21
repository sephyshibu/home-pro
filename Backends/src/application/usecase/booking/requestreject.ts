import { BookingRepository } from "../../../domain/repository/Bookingrepository";
import { walletRepository } from "../../../domain/repository/Walletrepository";
import { TransactionModel } from "../../../infrastructure/db/schemas/TransactionMode";

export class bookingRequestRejectByTech{
    constructor(private _bookingrepository:BookingRepository, private _walletrepository:walletRepository){}

    async bookingreacceptbytech(bookingId:string, reason:string):Promise<{success:boolean}>{

        const bookings=await this._bookingrepository.findById(bookingId)
        if(!bookings) throw new Error("no booking founded")

        const rejectbookings=  await this._bookingrepository.update(bookingId, { isconfirmedbyTech:"rejected",techremark:reason,refundrequestAccept:true, });
        console.log("usecase",rejectbookings)

        const refundamount=bookings.consultationFee
        const userwallet=await this._walletrepository.findById(bookings.userId.toString())
        if(!userwallet) throw new Error("user wallet not found")

        await this._walletrepository.increasebalance(bookings.userId.toString(), refundamount)
        await TransactionModel.create({
                    ownerId: userwallet.ownerId,
                    userType: 'user',
                    referenceId: bookings.id,
                    type: 'CREDIT',
                    method: bookings.consultationpaymethod || 'RazorPay',
                    status: 'success',
                    purpose: 'Refund for booking cancellation',
                    amount: refundamount,
                  });
                  

        return{success:true}
    }

}