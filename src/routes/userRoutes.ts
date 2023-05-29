import {  Router } from "express";
import { createUserController, updateEmailController } from "../controllers/userController";


let userRoutes = Router()

userRoutes.post('/api/user/createUser', createUserController)

userRoutes.put('/api/user/updateEmail',updateEmailController)

export default userRoutes