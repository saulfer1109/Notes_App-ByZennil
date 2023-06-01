import { Note, NoteCreationAttributes } from "../models/note";
import { User, UserInstance } from "../models/user";

export const registerNotes = async (notes: Array<NoteCreationAttributes>, user: UserInstance) => {
    console.log(user, User);
    
    notes.forEach(
        async (note) => {
            note.userId = user.id
            await Note.create(note)
        }
    )
}

export const getAllNotes = async (user: UserInstance) => {
    console.log(user);

    return await Note.findAll({
        attributes: ['id', 'label', 'description', 'createdAt', 'latestUpdate'],
        where: {
            userId: user.id
        },
    })
    
}