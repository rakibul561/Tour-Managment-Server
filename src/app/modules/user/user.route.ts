import { Router } from "express";
// import { checkAuth } from "../../middlewares/checkAuth";
import { UserControllers } from "./user.controller";
// import { Role } from "./user.interface";
import { validateRequest } from "../../../middleware/validateRequest";
import { createUserZodSchema } from "./user.validition";
import { checkAuth } from "../../../middleware/checkAuth";
import { Role } from "./user.interface";

const router = Router()



router.post("/register", validateRequest(createUserZodSchema), UserControllers.createUser)
router.get("/all-users", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), UserControllers.getAllUsers)

export const UserRoutes = router