import {  Router } from "express";
import { createUserHandler, loginHandler, logoutHandler, updateEmailHandler, updatePasswordHandler } from "../controllers/userControllers";


let userRoutes = Router()


userRoutes.post('/api/user/createUser', createUserHandler)

userRoutes.put('/api/user/updateEmail',updateEmailHandler)

userRoutes.put('/api/user/updatePassword',updatePasswordHandler)

userRoutes.post('/api/user/login',loginHandler)

userRoutes.post('/api/user/logout',logoutHandler)


export default userRoutes