import { Router } from "express";
import { deleteNoteHandler, getNotesHandler, registerNoteHandler, registerNotesHandler, updateNoteHandler } from "../controllers/noteControllers";
import { authenticate } from "../middleware/authentication";

let notesRoutes = Router()

notesRoutes.get('/api/note/getNotes', getNotesHandler)

notesRoutes.post('/api/note/registerNote', authenticate,registerNoteHandler)

notesRoutes.post('/api/note/registerNotes',authenticate,registerNotesHandler)

notesRoutes.put('/api/note/updateNote',authenticate, updateNoteHandler)

notesRoutes.delete('/api/note/deleteNote', authenticate, deleteNoteHandler)

export default notesRoutes