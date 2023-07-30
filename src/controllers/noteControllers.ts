import { RequestHandler } from "express";
import { NoteCreationAttributes } from "../models/note";
import { deleteNote, getAllNotes, registerNote, registerNotes, updateNote } from "../services/noteServices";
import jwt from "jsonwebtoken"
import { User } from "../models/user";

export const getNotesHandler: RequestHandler = async (req, res) => {
    // if(!req.session.authorized || !req.session.user){
    //     res.send(false)
    //     return
    // }    
    
    // res.send(await getAllNotes(req.session.user))

    let token = req.headers.authorization!.split(' ')[1]

    try{
        let jwObject = jwt.decode(token, {json: true})

        let user = await User.findByPk(jwObject!.id)
        let notes = await getAllNotes(user!)
        res.status(200).json({notes: notes.map(
            noteInstance => {
                return {
                    id: noteInstance.id,
                    name: noteInstance.name,
                    content: noteInstance.content,
                    color: noteInstance.color,
                    createdAt: noteInstance.createdAt,
                    updatedAt: noteInstance.updatedAt,
                    isFavorite: noteInstance.isFavorite
                }
            }
        )})

    }
    catch(err){
        res.status(401).send('No valid credentials')
    }
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
        let jwObject = jwt.decode(token,{json: true})
        console.log('jsonobject decoded')
        let newNote = await registerNote(note, BigInt(jwObject?.id))
        console.log('note created')


        console.log(newNote.dataValues)
        res.status(200).json({
            id: newNote.id,
            name: newNote.name,
            content: newNote.content,
            color: newNote.color,
            createdAt: newNote.createdAt,
            updatedAt: newNote.updatedAt,
            isFavorite: newNote.isFavorite
        })
        return
    }
    catch(err){
        res.status(403).send('No valid token')
        return
    }
    
}


export const updateNoteHandler: RequestHandler = async (req, res) => {
    let token = req.headers.authorization!.split(' ')[1]

    try {
        let jwObject =jwt.decode(token, {json: true})
        let userId = jwObject!.id

        console.log('getting data')
        let {id, updateData} = req.body
        console.log(id,updateData)
    
        res.status(200).json(await updateNote(userId, id, updateData))
        return
    } catch (err) {
        res.status(403).send('No valid token')
        return
    }
    

}

export const deleteNoteHandler: RequestHandler = async (req, res) => {
    // if(!req.session.authorized || !req.session.user){
    //     res.send(false)
    //     return
    // } 
    
    let {id} = req.body
    let token = req.headers.authorization!.split(' ')[1]

    try{
        let jwObject = jwt.decode(token) as any
        res.status(200).json(await deleteNote(jwObject!.id, id))

    }
    catch(err){
        res.status(401).send('No valid credentials')
    }
    
    
}


