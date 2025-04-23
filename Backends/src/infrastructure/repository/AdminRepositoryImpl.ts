import { IAdmin } from "../../domain/models/Admin";
import { AdminModel } from "../db/schemas/AdminModel";
import { AdminRepository } from "../../domain/repository/Adminrepository";


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
}