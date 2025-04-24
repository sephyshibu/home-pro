import { ITech } from "../models/Tech";

export interface TechRepository{
    createtech(tech:ITech):Promise<ITech>
    findByEmail(email:string):Promise<ITech|null>
}