import { Router } from "express";
import { deleteNoteHandler, getNotesHandler, registerNoteHandler, registerNotesHandler, updateNoteHandler } from "../handlers/noteHandlers";

let notesRoutes = Router()

notesRoutes.get('/api/note/getNotes', getNotesHandler)

notesRoutes.post('/api/note/registerNote',registerNoteHandler)

notesRoutes.post('/api/note/registerNotes',registerNotesHandler)

notesRoutes.put('/api/note/updateNote',updateNoteHandler)

notesRoutes.delete('/api/note/deleteNote',deleteNoteHandler)

export default notesRoutes