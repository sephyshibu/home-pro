import { ITech } from "../../domain/models/Tech";
import { TechModel } from "../db/schemas/techModel";
import { TechRepository } from "../../domain/repository/Techrepository";
import { WalletModel } from "../db/schemas/Walletmodel";
import mongoose from "mongoose";
export class TechRepositoryImpl implements TechRepository{
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

    async fetchTech(): Promise<ITech[]> {
        const tech=await TechModel.find()
        return tech
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
}