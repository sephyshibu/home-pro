import jwt from 'jsonwebtoken'

export interface TokenPayload{
    email:string
}

export const generateAccessToken=(payload:TokenPayload)=>{
    return jwt.sign(payload,process.env.JWT_SECRET!,{expiresIn:"15m"})
}


export const generaterefreshtoken=(payload:TokenPayload)=>{
    return jwt.sign(payload,process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" })
}