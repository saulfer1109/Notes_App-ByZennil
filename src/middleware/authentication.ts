import { RequestHandler } from "express";
import { User } from "../models/user";
// import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { TOKEN_KEY } from "../configuration/config";

export const authenticate:RequestHandler = async (req, res) => {

    const {email, password} = req.body

    let user = await User.findOne({where: {email}})

    if (user && user.password == password){
        const token =  jwt.sign(
            { user_id: user.id, email },
            TOKEN_KEY,
            {
                expiresIn: '2h'
            }
        )

        user.token = token
        user.save()

        res.status(200).json(token)
        
        console.log(token)
    }

    res.status(400).send('Invalid credentials')
}