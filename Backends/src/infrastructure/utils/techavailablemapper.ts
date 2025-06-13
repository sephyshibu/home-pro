import { ITech } from "../../domain/models/Tech";
import { TechAvailableDTO } from "../../application/dto/TechAvailableDTO";

export function fetchtechavailable(tech:ITech):TechAvailableDTO{
    return{
        _id:tech._id?.toString(),
        name:tech.name,
        noofworks:tech.noofworks,
        consulationFee:tech.consulationFee,
        rateperhour:tech.rateperhour,
        profileimgurl:tech.profileimgurl

    }
}