import { Categoryrepository } from "../../../domain/repository/categoryrepository";

export class fetchCategory{
    constructor(private categoryrepository:Categoryrepository){}

    async fetch(sortBy = 'name', order: 'asc' | 'desc' = 'asc'){
        const category=await this.categoryrepository.fetchcategory(sortBy,order)
        return category
    }
}