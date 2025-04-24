import { ITech } from "../../domain/models/Tech";
import { TechModel } from "../db/schemas/techModel";
import { TechRepository } from "../../domain/repository/Techrepository";


export class TechRepositoryImpl implements TechRepository{
    async createtech(tech: ITech): Promise<ITech> {
        console.log("tech data", tech)
        console.log("tech sign in")
        const createdTech=await TechModel.create(tech)
        console.log(createdTech)
        return createdTech
    }

    async findByEmail(email: string): Promise<ITech | null> {
        const tech=await TechModel.findOne({email})
        return tech?tech.toObject():null
    }
}