import { IAdmin } from "../../domain/models/Admin";
import { AdminModel } from "../db/schemas/AdminModel";
import { AdminRepository, FilterOptions } from "../../domain/repository/Adminrepository";
import { BookingModels } from "../db/schemas/BookingModel";



export class AdminRepositoryImpl implements AdminRepository{

    async createAdmin(admindata:IAdmin):Promise<IAdmin>{
        console.log(admindata)
        console.log("creating admin in repository impl")
        const createdAdmin=await AdminModel.create(admindata)
        console.log("created Admin", createdAdmin)
        return createdAdmin
    }

    async findByEmail(email: string): Promise<IAdmin | null> {
        const admin=await AdminModel.findOne({email})
        return admin?admin.toObject():null
    }
    async getDashboardStatus({ fromDate, toDate, filter }: FilterOptions): Promise<{ totalOrders: number; totaladmincommision: number; graphData: { date: string; commission: number; }[]; bookingdetails:any }> {
        const now=new Date()
        let start = fromDate ? new Date(fromDate) : new Date(now.getFullYear(), now.getMonth(), 1);
        let end = toDate ? new Date(toDate) : now;

        if (filter === 'week' && !fromDate) {
        start = new Date(now);
        start.setDate(now.getDate() - 7);
        }

        // Convert dates to 'YYYY-MM-DD' strings to match `booked_date` format
        const formatDate = (date: Date) => date.toISOString().split('T')[0];
        const startStr = formatDate(start);
        const endStr = formatDate(end);

        const bookings=await BookingModels.find({
            workstatus:"completed",
            booked_date:{
                $gte:startStr,
                $lte:endStr
            }
        })
        .populate({
            path:"userId",
            select:"name"
        })
        .populate({
            path:"technicianId",
            select:"name"
        })
        .populate({
            path:"addressId",
            select:"addressname"
        })

        

        const totalOrders=bookings.length
        const totaladmincommision=bookings.reduce((sum,b)=>sum+(b.admincommision||0),0)

        const commissionMap:Record<string,number>={}
        for(const booking of bookings){
            const key=booking.booked_date?? new Date().toISOString().split('T')[0]
            commissionMap[key]=(commissionMap[key]||0)+(booking.admincommision||0)
        }

        const graphData=Object.entries(commissionMap)
                            .map(([date, commission])=>({date,commission}))
                            .sort((a,b)=>new Date(a.date).getTime()- new Date(b.date).getTime())

        return {
            totalOrders,totaladmincommision,graphData,bookingdetails:bookings
        }


    }
}