import { Router } from "express";
import { UserControllers } from "./user.controller";
import { Role } from "./user.interface";
import { validateRequest } from "../../../middleware/validateRequest";
import { createUserZodSchema, updateUserZodSchema } from "./user.validition";
import { checkAuth } from "../../../middleware/checkAuth";

const router = Router()



router.post("/register", validateRequest(createUserZodSchema), UserControllers.createUser)
router.get("/all-users", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), UserControllers.getAllUsers)
router.patch("/:id", validateRequest(updateUserZodSchema), checkAuth(...Object.values(Role)), UserControllers.updateUser)
// /api/v1/user/:id
export const UserRoutes = router