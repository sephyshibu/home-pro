import { ITech } from "../../domain/models/Tech";
import { TechProfileDTO } from "../../application/dto/TechProfileDTO";

export function fetchtechinusermapper(tech:any):TechProfileDTO{
    return{
        _id:tech._id?.toString(),
        name:tech.name,
        email:tech.email,
        phone:tech.phone,
        serviceablepincode:tech.serviceablepincode,
        rateperhour:tech.rateperhour,
        noofworks:tech.noofworks,
        profileimgurl:tech.profileimgurl,
        consulationFee:tech.consulationFee,
        categoryid:{
            _id:tech.categoryid?._id.toString(),
            name:tech.categoryid.name,
            description:tech.categoryid.description


        }


    }
}