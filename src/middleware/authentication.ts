import jwt from 'jsonwebtoken'
// import { TOKEN_KEY } from "../configuration/config";
import { RequestHandler } from 'express';
import { TOKEN_KEY } from '../configuration/config';

export const authenticate: RequestHandler = async (req, res, next) => {

    let token = req.headers.authorization?.split(' ')[1]
    console.log(token)
    if(!token)
        return

    try{
       console.log(jwt.verify(token, TOKEN_KEY))
    }
    catch(err){
        console.log('jwt error')
        res.status(401).send('/login/')
        
        return
    }
    console.log('verified')
    return next()

}