import { ITech } from "../models/Tech";
import { TechProfilesDTO } from "../../application/dto/TechDTO";
import { TechAvailableDTO } from "../../application/dto/TechAvailableDTO";
import { TechProfileDTO } from "../../application/dto/TechProfileDTO";
export interface FilterOptions {
  fromDate?: string;
  toDate?: string;
  filter?: 'week' | 'month';
}

export interface ITechRepository{
    createtech(tech:ITech):Promise<ITech>
    findById(techid:string):Promise<{ isBlocked: boolean; email: string }|null>
    findByEmail(email:string):Promise<ITech|null>
    fetchTech(sortBy:string,order:'asc'|'desc',skip:number,limit:number):Promise<{tech:TechProfilesDTO[],total:number}>
    blockunblock(techid:string, isBlocked:boolean):Promise<ITech>
    findOneTech(techid:string):Promise<TechProfileDTO|null>
    edittech(techid:string,update:Partial<ITech>):Promise<ITech>
    fetchTechbasedonavilablity(pincode:string, date:string, categoryId:string):Promise<TechAvailableDTO[]|null>
    fetchTechwithcategory(techid:string):Promise<TechProfileDTO|null>
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