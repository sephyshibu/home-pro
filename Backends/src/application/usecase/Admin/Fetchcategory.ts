import { Categoryrepository } from "../../../domain/repository/categoryrepository";

export class fetchCategory{
    constructor(private _categoryrepository:Categoryrepository){}

    async fetch(sortBy = 'name', order: 'asc' | 'desc' = 'asc'){
        const category=await this._categoryrepository.fetchcategory(sortBy,order)
        return category
    }
}