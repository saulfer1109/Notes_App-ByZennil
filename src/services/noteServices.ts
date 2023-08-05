import { Note, NoteCreationAttributes, NoteInstance } from "../models/note";
import { User, UserInstance } from "../models/user";
import { updateNoteContent } from "../types";
import { updatingNoteResult } from "../types";

export const registerNotes = async (notes: Array<NoteCreationAttributes>, user: UserInstance) => {
    console.log(user, User);
    
    notes.forEach(
        async (note) => {
            registerNote(note, user.id)
        }
    )
}


export const registerNote = async (note: NoteCreationAttributes, id: BigInt) => {
    note.userId = id
    return await Note.create(note)
}

export const getAllNotes = async (user: UserInstance): Promise<NoteInstance[]> => {
    console.log(user);

    return await Note.findAll({
        attributes: ['id', 'content', 'name', 'createdAt', 'latestUpdate','color', 'isFavorite'],
        where: {
            userId: user.id
        },
    })
    
}


export const updateNote = async (userId: bigint,noteId:bigint , updateNoteContent: updateNoteContent): Promise<updatingNoteResult> => {
    
    let note = await Note.findByPk(noteId)

    console.log(note)

    if(!note)
        return {
            status: "failure",
            message: "No such note",
            payload: {
                id: noteId,
                name: '',
                content:'',
                color: 'red'
            }
        }
    if (note.userId != userId)
        return {
            status: "failure",
            message: "Not owner of the note",
            payload: {
                id: noteId,
                name: '',
                content:'',
                color: 'red'
            }
        }


    if(!(note.name != updateNoteContent.name) && !(note.content != updateNoteContent.content)){
        return {
            status: "failure",
            message: "No changes applied",
            payload: note
        }
    }

    if(updateNoteContent.name){
        note.name = updateNoteContent.name
    }

    if(updateNoteContent.content){
        note.content = updateNoteContent.content
    }

    if(updateNoteContent.isFavorite){
        note.isFavorite = updateNoteContent.isFavorite
    }
    
    note.updatedAt = new Date(Date.now())
        
    await note.save()

    return {
        status: "success",
        message: "Note updated",
        payload: note
    }
    
}

export const deleteNote = async (userId:bigint, noteId:bigint): Promise<updatingNoteResult> => {
    
    let note = await Note.findByPk(noteId)

    
    if(!note)
        return {
            status: "failure",
            message: "No such note",
            payload: {
                id: noteId,
                name: '',
                content:'',
                color: 'red'
            }
    }
    if (note.userId != userId)
    return {
        status: "failure",
        message: "Not owner of the note",
        payload: {
            id: noteId,
            name: '',
            content:'',
            color: 'red'
        }
    }

    await note.destroy()

    return {
        status: "success",
        message: "Note deleted",
        payload: note
    }
    
}