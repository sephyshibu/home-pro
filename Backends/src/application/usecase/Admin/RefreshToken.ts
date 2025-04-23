import jwt from 'jsonwebtoken'

export class RefreshToken{
    async refresh(refreshtoken:string):Promise<string>{
        if(!refreshtoken)
        {
            throw new Error("refresh token is missing")
        }

        const decoded:any=jwt.verify(refreshtoken, process.env.JWT_REFRESH_SECRET!);
        const newaccesstoken=jwt.sign({email:decoded.email}, process.env.JWT_REFRESH_SECRET!,{expiresIn:"15m"});

        return newaccesstoken
    }
}