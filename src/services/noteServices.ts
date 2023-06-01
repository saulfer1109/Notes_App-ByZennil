import { Note, NoteCreationAttributes } from "../models/note";
import { User, UserInstance } from "../models/user";

export const registerNotes = async (notes: Array<NoteCreationAttributes>, user: UserInstance) =>{
    console.log(user, User);
    
    notes.forEach(
        async (note) => {
            note.userId = user.id
            await Note.create(note)
        }
    )
}