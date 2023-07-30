import { loadEnv } from './configuration/env'
loadEnv()


import express from 'express'
import notesRoutes from './routes/noteRoutes'
import userRoutes from './routes/userRoutes'
import { sequelize } from './database/connection'
import { PORT } from './configuration/config'
import { UserInstance } from './models/user'
import session from 'express-session'
import { DAY_IN_MILLIS } from './configuration/config'
import cors from 'cors'
declare module "express-session"{
    interface SessionData{
        user: UserInstance
        authorized: boolean
    }
}

async function main(){

    let app = express().disable('x-powered-by')
    
    app.use(express.json())
    app.use(cors())
    app.use(session({
        secret: 'secretlytypedkeythatnoonewillguess',
        cookie: {
            sameSite: 'strict',
            maxAge: DAY_IN_MILLIS,
        }
    }))
    
    app.use(notesRoutes)
    app.use(userRoutes)

    await sequelize.authenticate()
    await sequelize.sync({
        alter: true,
    })
    
    
    app.listen(PORT, () => {
        console.log(`Server listening on PORT ${PORT}`);
        
    })
    
    app.get('/', (_,res) => {
        // console.log(req.session.user)
        // console.log(req.session.authorized)
        res.send('Hola Mundo')
    })
}

main()

