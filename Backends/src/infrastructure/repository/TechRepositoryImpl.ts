import { ITech } from "../../domain/models/Tech";
import { BookingModels } from "../db/schemas/BookingModel";
import { TechModel } from "../db/schemas/techModel";
import { ITechRepository } from "../../domain/repository/Techrepository";
import { WalletModel } from "../db/schemas/Walletmodel";
import mongoose from "mongoose";

export interface FilterOptions {
  fromDate?: string;
  toDate?: string;
  filter?: 'week' | 'month';
}

export class TechRepositoryImpl implements ITechRepository{
    async createtech(tech: ITech): Promise<ITech> {
        console.log("tech data", tech)
        console.log("tech sign in")
        const createdTech=await TechModel.create(tech)
        console.log(createdTech)

        await WalletModel.create({
            ownerId:createdTech._id,
            userType:"technician"
        })
        return createdTech
    }

    async findByEmail(email: string): Promise<ITech | null> {
        const tech=await TechModel.findOne({email})
        return tech?tech.toObject():null
    }

    async fetchTech(sortBy='name', order:'asc'|'desc'='asc',skip:number, limit:number): Promise<{tech:ITech[],total:number}> {
        const sortOrder = order === 'asc' ? 1 : -1;
        const [tech,total]=await Promise.all([
            TechModel
            .find()
            .sort({[sortBy]:sortOrder})
            .skip(skip)
            .limit(limit),
            TechModel.countDocuments()
        ])
        return{tech,total}
        
    }

    async fetchTechsBySearch(techname: string): Promise<ITech[]|null> {
            try {
                console.log("techmame",techname)
                const usernames=techname.trim().split(/\s+/)
                const regex=usernames.map((word=>`(?=.*\\b${word}\\w*)`))
                                      .join('')
    
                const users=await TechModel.find({name:{$regex:regex,$options:'i'}})
                return users
                
            } catch (error) {
                console.error("Error finding user:", error);
                return null;
              }
        }

    async blockunblock(techid: string, isBlocked: boolean): Promise<ITech> {
        const tech=await TechModel.findByIdAndUpdate(
            techid,
            {isBlocked},
            {new:true}
        )

        if(!tech){
            throw new Error("tech Not found")
        }
        return tech
    }

    async findOneTech(techid: string): Promise<ITech | null> {
        console.log("findtech")
        return await TechModel.findById(techid)
    }

    async fetchTechwithcategory(techid:string):Promise<ITech|null>{
        console.log("impl")
        return await TechModel.findById(techid).populate('categoryid',"name description")
    }

    async edittech(techid: string, update: Partial<ITech>): Promise<ITech> {
        console.log("edit tech",techid, update)
        const updated=await TechModel.findByIdAndUpdate(techid,update,{new:true})
        if(!updated) throw new Error("Tech Updation is failed")
        return updated
    }

    async findById(techid: string): Promise<{ isBlocked: boolean; email: string } | null> {
            try {
                const tech = await TechModel.findById(techid); // Find user by ID from database
                if (!tech) {
                  return null;
                }
                return { isBlocked: tech.isBlocked, email: tech.email }; // Return status and email
              } catch (error) {
                console.error("Error finding tech:", error);
                return null;
              }
        }

    async fetchTechbasedonavilablity(pincode: string, date: string, categoryId: string): Promise<ITech[] | null> {
        console.log("impl repository",pincode, date, categoryId)
        try {
            const technicians=await TechModel.find({
                isBlocked:false,
                serviceablepincode: { $in: [pincode] },
                categoryid:new mongoose.Types.ObjectId(categoryId),
                bookedSlots: {
                    $not: {
                      $elemMatch: { date }
                    }
                  }
            })
            console.log("tech", technicians)

            return technicians.length>0?technicians:null
        } catch (error) {
            console.error("Error fetching available technicians:", error);
            return null;
        }
    }
    async increasenoofworks(techId:string):Promise<void>{
        const result=await TechModel.findByIdAndUpdate(techId,{$inc:{noofworks:1}})
        console.log(result)
      }

    async getDashboardStats(techId: string, { fromDate, toDate, filter }: FilterOptions) {
    const now = new Date();

    // Step 1: Determine date range
    let start: Date;
    let end: Date;

    if (fromDate && toDate) {
        start = new Date(fromDate);
        end = new Date(toDate);
    } else if (filter === 'week') {
        end = now;
        start = new Date();
        start.setDate(end.getDate() - 7);
    } else {
        // Default to current month
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        end = new Date(now.getFullYear(), now.getMonth() + 1, 0); // end of month
    }

    // Convert to string if booked_date is string; otherwise skip this
    const formatDate = (date: Date) => date.toISOString().split('T')[0];
    const startStr = formatDate(start);
    const endStr = formatDate(end);

    // Step 2: Filter by booked_date
    const bookings = await BookingModels.find({
        technicianId: techId,
        workstatus: 'completed',
        booked_date: {
            $gte: startStr,
            $lte: endStr
        }
    });

    // Step 3: Calculate stats
    const totalOrders = bookings.length;
    const totalCommission = bookings.reduce((sum, b) => sum + (b.techcommision || 0), 0);

    // Step 4: Group commissions by booked_date
    const commissionMap: Record<string, number> = {};
    for (const booking of bookings) {
        const key = booking.booked_date ?? formatDate(new Date());
        commissionMap[key] = (commissionMap[key] || 0) + (booking.techcommision || 0);
    }

    const graphData = Object.entries(commissionMap)
        .map(([date, commission]) => ({ date, commission }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return {
        totalOrders,
        totalCommission,
        graphData
    };
}


}