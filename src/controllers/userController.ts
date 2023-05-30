import { RequestHandler } from "express";
import { UserAttributes, updateApiResponse } from "../types";
import { createUser, updateEmail, updatePassword } from "../services/userServices";

export const createUserController:RequestHandler = async (req,res) => {
    let userData = req.body as UserAttributes
    try{
        let user =  await createUser(userData);
        console.log(user);
        
        res.send(true)
    }
    catch(error){
        res.send(false)
    }
}

export const updatePasswordController: RequestHandler = async (req, res) => {
    let { id, oldPassword, newPassword } = req.body

    let updateValue = await updatePassword(id, oldPassword, newPassword)

    let apiResponseMessage: updateApiResponse = {
        updated: (updateValue == 'Updated succesfully'),
        message: updateValue
    }

    res.send(apiResponseMessage)
}

export const updateEmailController: RequestHandler = async (req, res) => {
    let { id, email } = req.body
    
    const updateValue = await updateEmail(id,email)

    let apiResponseMessage: updateApiResponse = {
        updated: (updateValue == 'Updated succesfully'),
        message: updateValue
    }

    res.send(apiResponseMessage)
}