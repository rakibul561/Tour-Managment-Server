/* eslint-disable @typescript-eslint/no-empty-function */
import crypto from "crypto";
import { redisClient } from "../../../config/redis.config";
import { sendEmail } from "../../utils/sendEmail";
import AppError from "../../errorHelpers/AppError";
import { User } from "../user/user.mdal";
const OTP_EXPIRATION = 2 * 60 ;


 export const generateOtp = (length = 6) => {
    //6 digit otp
    const otp = crypto.randomInt(10 ** (length - 1), 10 ** length).toString()

    // 10 ** 5 => 10 * 10 *10 *10 *10 * 10 => 1000000

    return otp
}

const sendOTP = async (email:string, name: string) => {
     
    const user = await User.findOne({email})

    if(!user){
        throw new AppError(404, "User Not found")
    }

    if(user.isVerified){
        throw new AppError(401, "You Are Already Verified")
    }
    const otp = generateOtp() 
    const redisKey = `otp:${email}`
    await redisClient.set(redisKey, otp, {
        expiration: {
            type:"EX",
            value: OTP_EXPIRATION
        }
    })

    
    await sendEmail({
        to: email,
        subject: "Your OTP Code",
        templateName: "otp",
        templateData: {
            name: name,
            otp: otp
        }
    })

};

const verifyOTP = async (email:string, otp:string) => {
    // const user = await User.findOne({ email, isVerified: false })
  
    const redisKey = `otp:${email}`

    const savedOtp = await redisClient.get(redisKey)

    const user = await User.findOne({email})

    if(!user){
        throw new AppError(404, "User Not found")
    }

    if(user.isVerified){
        throw new AppError(401, "You Are Already Verified")
    }


    if(!savedOtp){
        throw new AppError(401, "Invalid Otp")
    }

    if(savedOtp !== otp){
        throw new AppError(401, "Invalid Otp")
    }
 
    
   
    await Promise.all([
        User.updateOne({email}, {isVerified: true}, {runValidators: true}),
       redisClient.del([redisKey])
    ])

};

export const OTPService = {
    sendOTP,
    verifyOTP
}