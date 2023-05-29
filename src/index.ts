import express from 'express'
import notesRoutes from './routes/noteRoutes'
import userRoutes from './routes/userRoutes'
import { sequelize } from './database/connection'

const PORT = 3000

async function main(){

    let app = express()
    
    app.use(express.json())
    app.use(notesRoutes)
    app.use(userRoutes)

    sequelize.authenticate()
    await sequelize.sync()
    
    
    app.listen(PORT, () => {
        console.log(`Server listening on PORT ${PORT}`);
        
    })
    
    app.get('/', (_,res) => {
        res.send('Hola Mundo')
    })
}

main()

