/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status-codes"
import { sendResponse } from "../../utils/sendResponse"
import { catchAsync } from "../../utils/catchAysnc"
import { AuthServices } from "./auth.services"

const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthServices.credentialsLogin(req.body)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Logged In Successfully",
        data: loginInfo,
    })
})

const getNewAccessToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
    const refreshToken = req.cookies.refreshToken;
    const tokenInfo = await AuthServices.getNewAccessToken(refreshToken)
     

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Logged In Successfully",
        data: tokenInfo,
    })
}) 
const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
   res.clearCookie("access-token", {
    httpOnly:true,
    secure:false,
    sameSite:"lax"
   })
   res.clearCookie("accessToken", {
    httpOnly:true,
    secure:false,
    sameSite:"lax"
   })
   res.clearCookie("refreshToken", {
    httpOnly:true,
    secure:false,
    sameSite:"lax"
   })

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Logout Successfully",
        data: null ,
    })
}) 




export const AuthControllers = {
    credentialsLogin,
    getNewAccessToken,
    logout
}