import { loadEnv } from './configuration/env'
loadEnv()


import express from 'express'
import notesRoutes from './routes/noteRoutes'
import userRoutes from './routes/userRoutes'
import { sequelize } from './database/connection'
import { PORT } from './configuration/config'
import session from 'express-session'
import User from './models/user'
import { DAY_IN_MILLIS } from './configuration/config'
declare module "express-session"{
    interface SessionData{
        user: User
        authorized: boolean
    }
}

async function main(){

    let app = express().disable('x-powered-by')
    
    app.use(express.json())
    app.use(session({
        secret: 'secretlytypedkeythatnoonewillguess',
        cookie: {
            sameSite: 'strict',
            maxAge: DAY_IN_MILLIS,
        }
    }))
    
    app.use(notesRoutes)
    app.use(userRoutes)

    sequelize.authenticate()
    await sequelize.sync()
    
    
    app.listen(PORT, () => {
        console.log(`Server listening on PORT ${PORT}`);
        
    })
    
    app.get('/', (req,res) => {
        console.log(req.session.user)
        console.log(req.session.authorized)
        res.send('Hola Mundo')
    })
}

main()

