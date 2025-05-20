import jwt from 'jsonwebtoken'

export class RefreshToken{
    async refresh(refreshtoken:string):Promise<string>{
        console.log("refeehsing tech in use case",refreshtoken)
        if(!refreshtoken)
        {
            throw new Error("refresh token is missing")
        }

        const decoded:any=jwt.verify(refreshtoken, process.env.JWT_REFRESH_SECRET!);
        const newaccesstoken=jwt.sign({email:decoded.email}, process.env.JWT_SECRET!,{expiresIn:"15m"});
        console.log("new access tokenn in tech use case", newaccesstoken)
        return newaccesstoken
    }
}