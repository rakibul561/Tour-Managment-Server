 
import express from "express";
import { checkAuth } from "../../../middleware/checkAuth";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../../middleware/validateRequest";
import { BookingController } from "./booking.controller";
import { createBookingZodSchema } from "./booking.validatiion";




  const router = express.Router();


//   api/v1/booking

router.post("/", checkAuth(...Object.values(Role)), 
validateRequest(createBookingZodSchema),BookingController.createBooking
); 


// api/v1/booking/my-bookings
router.get("/my-bookings",
    checkAuth(...Object.values(Role)),
    BookingController.getUserBookings
);
 



export const BookingRoutes = router;