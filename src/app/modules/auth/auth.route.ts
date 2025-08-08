import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
import { Role } from "../user/user.interface";
import { AuthControllers } from "./auth.controller";
import { checkAuth } from "../../../middleware/checkAuth";
import { envVars } from "../../../config/env";

const router = Router()

router.post("/login", AuthControllers.credentialsLogin)
router.post("/refresh-token", AuthControllers.getNewAccessToken)
router.post("/logout", AuthControllers.logout)
router.post("/change-password", checkAuth(...Object.values(Role)), AuthControllers.changePassword)
router.post("/set-password", checkAuth(...Object.values(Role)), AuthControllers.setPassword)
router.post("/forgot-password",  AuthControllers.forgotPassword)
router.post("/reset-password", checkAuth(...Object.values(Role)), AuthControllers.resetPassword)



//  /booking -> /login -> succesful google login -> /booking frontend
// /login -> succesful google login -> / frontend
router.get("/google", async (req: Request, res: Response, next: NextFunction) => {
    const redirect = req.query.redirect || "/"
    passport.authenticate("google", { scope: ["profile", "email"], state: redirect as string })(req, res, next)
})

// api/v1/auth/google/callback?state=/booking
router.get("/google/callback", passport.authenticate("google", { failureRedirect: `${envVars.FRONTEND_URL}/login?error= there is some issue with your acount.please contact in our support team ` }), AuthControllers.googleCallbackController)

export const AuthRoutes = router;