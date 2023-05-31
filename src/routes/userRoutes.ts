import {  Router } from "express";
import { createUserController, loginController, logoutController, updateEmailController, updatePasswordController } from "../controllers/userControllers";


let userRoutes = Router()


userRoutes.post('/api/user/createUser', createUserController)

userRoutes.put('/api/user/updateEmail',updateEmailController)

userRoutes.put('/api/user/updatePassword',updatePasswordController)

userRoutes.post('/api/user/login',loginController)

userRoutes.post('/api/user/logout',logoutController)


export default userRoutes