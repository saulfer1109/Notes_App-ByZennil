import { RequestHandler } from "express";
import { updateApiResponse } from "../types";
import { authenticate, createUser, updateEmail, updatePassword } from "../services/userServices";
import { UserCreationAttributes } from "../models/user";

export const createUserHandler:RequestHandler = async (req,res) => {
    let userData = req.body as UserCreationAttributes
    try{
        let user =  await createUser(userData);
        console.log(user);
        
        res.send(true)
    }
    catch(error){
        res.send(false)
    }
}

export const updatePasswordHandler: RequestHandler = async (req, res) => {
    let { id, oldPassword, newPassword } = req.body

    let updateValue = await updatePassword(id, oldPassword, newPassword)

    let apiResponseMessage: updateApiResponse = {
        updated: (updateValue == 'Updated succesfully'),
        message: updateValue
    }

    res.send(apiResponseMessage)
}

export const updateEmailHandler: RequestHandler = async (req, res) => {
    let { id, email } = req.body
    
    const updateValue = await updateEmail(id,email)

    let apiResponseMessage: updateApiResponse = {
        updated: (updateValue == 'Updated succesfully'),
        message: updateValue
    }

    res.send(apiResponseMessage)
}


export const loginHandler: RequestHandler = async (req,res) => {
    let {email, password} = req.body

    if((!email || !password)) {
        res.send(false)
        return
    }

    let user = await authenticate(email,password)

    if (user){
        req.session.authorized = true        
        req.session.user = user        
        res.send(true)
        return
    }
    res.send(false)
}


export const logoutHandler: RequestHandler = async (req, res) => {

    req.session.destroy(console.log)

    res.send(true)
}