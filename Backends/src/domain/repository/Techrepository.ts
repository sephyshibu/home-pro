import { ITech } from "../models/Tech";

export interface TechRepository{
    createtech(tech:ITech):Promise<ITech>
    findById(techidL:string):Promise<{ isBlocked: boolean; email: string }|null>
    findByEmail(email:string):Promise<ITech|null>
    fetchTech():Promise<ITech[]>
    blockunblock(techid:string, isBlocked:boolean):Promise<ITech>
    findOneTech(techid:string):Promise<ITech|null>
    edittech(techid:string,update:Partial<ITech>):Promise<ITech>
    fetchTechbasedonavilablity(pincode:string, date:string, categoryId:string):Promise<ITech[]|null>
    fetchTechwithcategory(techid:string):Promise<ITech|null>
}