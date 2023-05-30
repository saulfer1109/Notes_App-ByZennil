import {  Router } from "express";
import { createUserController, updateEmailController, updatePasswordController } from "../controllers/userController";


let userRoutes = Router()


userRoutes.post('/api/user/createUser', createUserController)

userRoutes.put('/api/user/updateEmail',updateEmailController)

userRoutes.put('/api/user/updatePassword',updatePasswordController)


export default userRoutes