import { TransactionRepository } from "../../../domain/repository/Transsactionrepository";
import { BookingRepository } from "../../../domain/repository/Bookingrepository";

export class GetTransactionWithBookings{
    constructor(private transactionrepository:TransactionRepository, private bookingrepository:BookingRepository){}


    async execute(transactionid:string){
        const transaction =await this.transactionrepository.findById(transactionid)

        if(!transaction) throw new Error("no transaction found")

        const booking=await this.bookingrepository.findByIdWithPopulates(transaction.referenceId.toString());

        if(!booking) throw new Error("no booking details")

            return {
                username: (booking.userId as { name: string }).name,
                techname: (booking.technicianId as { name: string }).name,
                addressname: (booking.addressId as { addressname: string }).addressname,
                bookeddate: booking.booked_date,
                consultationpaymethod: booking.consultationpaymethod,
                userremark: booking.userremark,
                techremark: booking.techremark,
              };

    }
}