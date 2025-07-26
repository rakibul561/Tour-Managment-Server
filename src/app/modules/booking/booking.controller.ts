import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAysnc";
import { sendResponse } from "../../utils/sendResponse";
import { BookingService } from "./booking.service";
import { JwtPayload } from "jsonwebtoken";



  const createBooking = catchAsync(async (req:Request, res:Response) => {

    const decodedToken = req.user as JwtPayload;
     const booking = await BookingService.createBooking(req.body,decodedToken.userId );
     sendResponse(res, {
        statusCode: 201 ,
        success:true,
        message: "Booking created Succesfull",
        data:booking
     })
  })
  const getUserBookings = catchAsync(async (req:Request, res:Response) => {
     const booking = await BookingService.getUserBookings();
     sendResponse(res, {
        statusCode: 201 ,
        success:true,
        message: "Booking retrieved Succesfull",
        data:booking
     })
  }) 


  export const BookingController = {
    createBooking, 
    getUserBookings
  }