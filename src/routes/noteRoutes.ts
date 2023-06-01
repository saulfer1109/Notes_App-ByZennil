import { Router } from "express";
import { deleteNoteController, getNotesController, registerNotesController, updateNoteController } from "../controllers/noteControllers";

let notesRoutes = Router()

notesRoutes.get('/api/note/getNotes', getNotesController)

notesRoutes.post('/api/note/registerNotes',registerNotesController)

notesRoutes.put('/api/note/updateNote',updateNoteController)

notesRoutes.delete('/api/note/deleteNote',deleteNoteController)

export default notesRoutes