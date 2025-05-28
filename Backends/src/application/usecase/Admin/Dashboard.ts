import { AdminRepository } from "../../../domain/repository/Adminrepository";

interface FilterOptions{
    fromDate?:string,
    toDate?:string;
    filter?:"week"|'month'

}

export class GetAdminDashboard{
    constructor(private _adminrepository:AdminRepository){}

    async execute(filters:FilterOptions){
        return await this._adminrepository.getDashboardStatus(filters)
    }
}