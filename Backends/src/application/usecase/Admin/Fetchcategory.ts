import { Categoryrepository } from "../../../domain/repository/categoryrepository";

export class fetchCategory{
    constructor(private categoryrepository:Categoryrepository){}

    async fetch(){
        const category=await this.categoryrepository.fetchcategory()
        return category
    }
}