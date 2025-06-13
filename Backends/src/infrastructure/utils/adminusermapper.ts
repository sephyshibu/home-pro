import { IUser } from "../../domain/models/User";
import { UserprofileDTO } from "../../application/dto/UserDTO";

export function adminusermapper(user:IUser):UserprofileDTO{
    return{
        _id:user._id?.toString(),
        name:user.name,
        email:user.email,
        phone:user.phone,
        isBlocked:user.isBlocked

    }
}