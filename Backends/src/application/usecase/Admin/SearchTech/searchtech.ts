import { ITech } from "../../../../domain/models/Tech";
import { TechRepository } from "../../../../domain/repository/Techrepository";

export class Searchingtech{
    constructor(private _techrepository:TechRepository){}

    async searchingtech(techname:string):Promise<ITech[]|null>{
        try {
            const techs=await this._techrepository.fetchTechsBySearch(techname)
            return techs
        } catch (error) {
            console.error("Error fetching techs:", error);
            return null;
        }
       

    }
}