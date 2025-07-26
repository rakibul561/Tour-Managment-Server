import { z } from "zod";
import { BOOKINFG_STATUS } from "./booking.inteface";

export const createBookingZodSchema = z.object({
    tour: z.string(),
    guestCount: z.number().int().positive()

});

export const updateBookingStatusZodSchema = z.object({
    status: z.enum(Object.values(BOOKINFG_STATUS) as [string]),
});