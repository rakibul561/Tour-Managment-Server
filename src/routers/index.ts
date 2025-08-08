import { Router } from "express"
import { UserRoutes } from "../app/modules/user/user.route"
import { AuthRoutes } from "../app/modules/auth/auth.route"
import { DivisionRoutes } from "../app/modules/division/division.route"
import { TourRoutes } from "../app/modules/tour/tour.route"
import { BookingRoutes } from "../app/modules/booking/booking.route"
import { PaymentsRoute } from "../app/modules/payment/payment.route"
import { OtpRoutes } from "../app/modules/otp/otp.route"

export const router = Router()

const moduleRoutes = [
    {
        path: "/user",
        route: UserRoutes
    },
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
        path: "/division",
        route: DivisionRoutes
    },
    {
        path: "/tour",
        route: TourRoutes
    },
    {
        path: "/booking",
        route: BookingRoutes
    },
    {
        path: "/payment",
        route: PaymentsRoute
    },
    {
        path: "/otp",
        route: OtpRoutes
    }
  
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

// router.use("/user", UserRoutes)
// router.use("/tour", TourRoutes)
// router.use("/division", DivisionRoutes)
// router.use("/booking", BookingRoutes)
// router.use("/user", UserRoutes)