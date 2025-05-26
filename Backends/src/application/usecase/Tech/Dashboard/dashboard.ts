import { BookingRepository } from "../../../../domain/repository/Bookingrepository";


export class TechDashboard{
    constructor(private _bookingrepository:BookingRepository){}


    async techdash(techId:string):Promise<{totalSales:number, totalOrders:number}>{
        try {
           return await this._bookingrepository.totalSales(techId)
        } catch (error) {
            console.log("errorr", error)
            return { totalSales: 0, totalOrders: 0 };
        }

    }
}