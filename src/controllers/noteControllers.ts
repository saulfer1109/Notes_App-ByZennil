import { RequestHandler } from "express";
import { NoteCreationAttributes } from "../models/note";
import { deleteNote, getAllNotes, registerNote, registerNotes, updateNote } from "../services/noteServices";


export const getNotesController: RequestHandler = async (req, res) => {
    if(!req.session.authorized || !req.session.user){
        res.send(false)
        return
    }    
    
    res.send( await getAllNotes(req.session.user))

}

export const registerNotesController: RequestHandler = async (req, res) => {
    if(!req.session.authorized || !req.session.user){
        res.send(false)
        return
    }    

    let notes: Array<NoteCreationAttributes>
    
    try {
        notes = req.body.notes
        registerNotes(notes,req.session.user)
        res.send(true)
        return

    } catch (error) {
        res.send(false)
        return
    }
}

export const registerNoteController: RequestHandler = async (req, res) => {
    if (!req.session.authorized || !req.session.user) {
        res.send(false)
        return
    }
    let note: NoteCreationAttributes
    try {
        note = req.body.note
        registerNote(note, req.session.user.id)
        res.send(true)
        return

    }
    catch (error) {
        res.send(false)
        return
    }
}


export const updateNoteController: RequestHandler = async (req, res) => {
    if(!req.session.authorized || !req.session.user){
        res.send(false)
        return
    } 
    
    let {id, attribute, value} = req.body
    let userId = req.session.user.id

    res.json( await updateNote(userId, id, attribute, value))

}

export const deleteNoteController: RequestHandler = async (req, res) => {
    if(!req.session.authorized || !req.session.user){
        res.send(false)
        return
    } 
    
    let {id} = req.body

    res.json(await deleteNote(req.session.user.id, id))
    
}


