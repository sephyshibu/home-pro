import { IAdmin } from "../models/Admin";

export interface AdminRepository{
    createAdmin(admin:IAdmin):Promise<IAdmin>
    findByEmail(email:string):Promise<IAdmin|null>
}