import { useState } from "react"
import { Note, NoteProps } from "./Note"


interface props {
    tailwindStyles: string,
    notesArray: Array<NoteProps>
}

export const NotesBoard = ({tailwindStyles,notesArray}:props) => {

    const [notes, setNotes] = useState(notesArray)
    
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

        setNotes(newNotes)

        
    }

    return (
        <section className={`${tailwindStyles} pt-10 px-32 grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] grid-rows-[repeat(auto-fit,minmax(100px,12rem))] gap-x-24 gap-y-8 overflow-y-scroll`}>
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