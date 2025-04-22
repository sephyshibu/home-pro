import nodemailer from 'nodemailer'


export class EmailService{
    private transporter;

    constructor(){
        this.transporter=nodemailer.createTransport({
            service:"gmail",
            port:465,
            secure:true,
            auth:{
                user: process.env.NODEMAILER_GMAIL,
                pass: process.env.NODEMAILER_PASSWORD,
            }
        })
    } 

    async sendVerificationEmail(email:string, otp:string):Promise<Boolean>{
        try {
            const info=await this.transporter.sendMail({
                from:process.env.NODEMAILER_GMAIL,
                to:email,
                subject:"Verify Your account- HOmePro",
                text:`Your OTP is ${otp}`,
                html:`<b>Your OTP : ${otp}</b>`,
            })
            return info.accepted.length > 0;
        } catch (error) {
          console.error("Error sending email:", error);
          return false;
        }
    }
}
