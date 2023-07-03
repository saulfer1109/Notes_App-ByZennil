import { useRef, useState } from "react"
import { Note, NoteProps } from "./Note"
import { EditNoteMenu } from "./EditNoteMenu"


interface props {
    tailwindStyles: string,
    notesArray: Array<NoteProps>
}

export const NotesBoard = ({tailwindStyles,notesArray}:props) => {

    const [notes, setNotes] = useState(notesArray)
    const [editing, setEditing] = useState(false)
    let activeNote = useRef<NoteProps | undefined>(undefined)

    const findIndexNoteById = (noteId:number):number => {
        let index = notes.findIndex((note) => note.id == noteId)
        
        if (index === -1){
            throw new Error(`No note with id ${noteId}`)
        }
        
        return index
    }

    const handleFavoriteToggle = (noteId:number):void => {
        let index = findIndexNoteById(noteId)
        let newNotes = [...notes] 
        newNotes[index].isFavorite = !newNotes[index].isFavorite
        
        setNotes(newNotes)
        
        
    }
    
    const handleEdition = (noteId:number):void=> {
        let index = findIndexNoteById(noteId)
        let newNotes = [...notes]
            
        console.log(index)

        activeNote.current = newNotes[index]

        setEditing(true)
        
        setNotes(newNotes)

        
    }

    return (
        <section className={`${tailwindStyles} pt-10 px-32 grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] grid-rows-[repeat(auto-fit,minmax(100px,12rem))] gap-x-24 gap-y-8 overflow-y-scroll`}>
            {
                editing && 
                <EditNoteMenu
                    noteProperties={activeNote.current}
                    setIsActive={setEditing}
                />
            }
            
            {...notes.map((note) =>
                <Note
                    key={note.id}
                    noteProperties={note}
                    onEdition={handleEdition}
                    onFavoriteToggle={handleFavoriteToggle}
                />
            )}
        </section>
    )
}