import { ITech } from "../../domain/models/Tech";
import { TechProfileDTO } from "../../application/dto/TechDTO";

export function admintechmapper(tech:ITech):TechProfileDTO{
    return{
        _id:tech._id?.toString(),
        name:tech.name,
        email:tech.email,
        phone:tech.phone,
        isBlocked:tech.isBlocked

    }
}