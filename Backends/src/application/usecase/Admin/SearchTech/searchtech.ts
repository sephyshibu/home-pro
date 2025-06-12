import { ITech } from "../../../../domain/models/Tech";
import { ITechRepository } from "../../../../domain/repository/Techrepository";

export class Searchingtech{
    constructor(private _techrepository:ITechRepository){}

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