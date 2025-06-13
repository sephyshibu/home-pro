import { ITech } from "../../domain/models/Tech";
import { TechProfilesDTO } from "../../application/dto/TechDTO";

export function admintechmapper(tech:ITech):TechProfilesDTO{
    return{
        _id:tech._id?.toString(),
        name:tech.name,
        email:tech.email,
        phone:tech.phone,
        isBlocked:tech.isBlocked

    }
}