import { ITech } from "../models/Tech";
import { TechProfileDTO } from "../../application/dto/TechDTO";
export interface FilterOptions {
  fromDate?: string;
  toDate?: string;
  filter?: 'week' | 'month';
}

export interface ITechRepository{
    createtech(tech:ITech):Promise<ITech>
    findById(techid:string):Promise<{ isBlocked: boolean; email: string }|null>
    findByEmail(email:string):Promise<ITech|null>
    fetchTech(sortBy:string,order:'asc'|'desc',skip:number,limit:number):Promise<{tech:TechProfileDTO[],total:number}>
    blockunblock(techid:string, isBlocked:boolean):Promise<ITech>
    findOneTech(techid:string):Promise<ITech|null>
    edittech(techid:string,update:Partial<ITech>):Promise<ITech>
    fetchTechbasedonavilablity(pincode:string, date:string, categoryId:string):Promise<ITech[]|null>
    fetchTechwithcategory(techid:string):Promise<ITech|null>
    increasenoofworks(techId:string):Promise<void>
    fetchTechsBySearch(username:string):Promise<ITech[]|null>
    getDashboardStats(
    techId: string,
    filters: FilterOptions
  ): Promise<{
    totalOrders: number;
    totalCommission: number;
     graphData: { date: string; commission: number }[];
  }>;
}