import { model, Schema } from "mongoose";
import { BOOKINFG_STATUS, IBooking } from "./booking.inteface";

 
 const bookingSchema = new Schema<IBooking> ({
    
    user: {
        type : Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    tour: {
        type : Schema.Types.ObjectId,
        ref: "Tour",
        required: true
    },
    payment: {
        type : Schema.Types.ObjectId,
        ref: "Payment",
    },
    status: {
        type: String,
        enum: Object.values(BOOKINFG_STATUS),
        default: BOOKINFG_STATUS.PENDING
    },
    guestCount: {
        type: Number,
        required: true
    }
     
 }, {
    timestamps:true,
 }) 


  export const Booking = model<IBooking>("Booking", bookingSchema)