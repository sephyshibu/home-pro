import { ICategoryrepository } from "../../../domain/repository/categoryrepository";

export class fetchCategory{
    constructor(private _categoryrepository:ICategoryrepository){}

    async fetch(sortBy = 'name', order: 'asc' | 'desc' = 'asc'){
        const category=await this._categoryrepository.fetchcategory(sortBy,order)
        return category
    }
}