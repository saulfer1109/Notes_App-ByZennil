import { RequestHandler } from "express";
import { UserAttributes } from "../types";
import { createUser, updateEmail } from "../services/userServices";

export const createUserController:RequestHandler = (req,res) => {
    let userData = req.body as UserAttributes
    try{
        createUser(userData);
        res.send(true)
    }
    catch(error){
        res.send(false)
    }
}

export const updateEmailController:RequestHandler = (req, res) => {
    let {email, id} = req.body
    updateEmail(id,email)
    .then( 
        () => res.send(true)
    )
    .catch(
        () => {
            res.send(false)
        }
    )
}