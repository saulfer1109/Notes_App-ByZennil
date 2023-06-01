import { RequestHandler } from "express";
import { NoteCreationAttributes } from "../models/note";
import { registerNotes } from "../services/noteServices";


export const getNotesController: RequestHandler = (req, res) => {
    console.log(req,res)
}

export const registerNotesController: RequestHandler = (req, res) => {
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

export const updateNoteController: RequestHandler = (req, res) => {
    console.log(req,res)
    
}

export const deleteNoteController: RequestHandler = (req, res) => {
    console.log(req,res)
    
}


