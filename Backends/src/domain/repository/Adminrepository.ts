import { IAdmin } from "../models/Admin";
export interface FilterOptions {
  fromDate?: string;
  toDate?: string;
  filter?: 'week' | 'month';
}

export interface IAdminRepository{
    createAdmin(admin:IAdmin):Promise<IAdmin>
    findByEmail(email:string):Promise<IAdmin|null>
    getDashboardStatus(filters:FilterOptions):Promise<{totalOrders:number, totaladmincommision:number, graphData:{date:string, commission:number}[]}>
}