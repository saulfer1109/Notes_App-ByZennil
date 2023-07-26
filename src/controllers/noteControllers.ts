import { RequestHandler } from "express";
import { NoteCreationAttributes } from "../models/note";
import { deleteNote, getAllNotes, registerNote, registerNotes, updateNote } from "../services/noteServices";
import jwt, { JwtPayload } from "jsonwebtoken"

export const getNotesHandler: RequestHandler = async (req, res) => {
    if(!req.session.authorized || !req.session.user){
        res.send(false)
        return
    }    
    
    res.send(await getAllNotes(req.session.user))

}

export const registerNotesHandler: RequestHandler = async (req, res) => {
    
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

export const registerNoteHandler: RequestHandler = async (req, res) => {
    let token = req.headers.authorization?.split(' ')[1]
    if(!token)
        return

    let { note } = req.body
    
    try{
        let jwObject = jwt.decode(token) as JwtPayload

        registerNote(note, BigInt(jwObject.id as number))

    }
    catch(err){
        res.status(402).send('No valid token')
    }
    
}


export const updateNoteHandler: RequestHandler = async (req, res) => {
    if(!req.session.authorized || !req.session.user){
        res.send(false)
        return
    } 
    
    let {id, attribute, value} = req.body
    let userId = req.session.user.id

    res.json( await updateNote(userId, id, attribute, value))

}

export const deleteNoteHandler: RequestHandler = async (req, res) => {
    if(!req.session.authorized || !req.session.user){
        res.send(false)
        return
    } 
    
    let {id} = req.body

    res.json(await deleteNote(req.session.user.id, id))
    
}


