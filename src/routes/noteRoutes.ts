import { Router } from "express";

let notesRoutes = Router()

notesRoutes.get('/get_notes', (_,res) => {
    res.send('Getting notes')
})

notesRoutes.post('/register_notes', (_,res) => {
    res.send('Registering notes')
})

export default notesRoutes