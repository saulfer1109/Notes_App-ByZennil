import {  useRef, useState, useEffect } from "react"
import { PanelDashboard } from "../../components/PanelDashboard"
import { NotesBoard } from "../../components/NotesBoard"
import { NoteAttributes, NoteCreationAttributes, isNoteCreationAttributes } from "../../types/notes.types"
import { EditNoteMenu } from "../../components/EditNoteMenu"
import { createNote, getAllNotes, updateNote } from "../../services/NoteServices"


const App = () => {

    useEffect(() => {
        getAllNotes().then(data => {
            const { notes } = data

            console.log(notes)

            setNotes(
                notes.map(
                    (note: any) =>{
                        note.createdAt = new Date(note.createdAt)
                        note.updatedAt = new Date(note.updatedAt)
                        
                        return note
                    }
                )
            )
        })
    }, [])
    const initialNotesArray: Array<NoteAttributes> = []
    const [notes, setNotes] = useState(initialNotesArray)
    const [creatingNote, setCreatingNote] = useState(false)
    let newNote = useRef<NoteCreationAttributes | undefined>(undefined)
    

    const handleCreateNote = (color: string) => {
        newNote.current = {
            name: 'New Note',
            color,
            content: 'Content of the new Note',
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now()),
        }
        setCreatingNote(true)
    }

    const handleSyncData = (note: Partial<NoteAttributes> | NoteCreationAttributes) => {
        if (isNoteCreationAttributes(note)){
            createNote(note)
            .then(
                object => {
                    if(typeof object == 'string'){
                        window.location.pathname = 'login'
                        return
                    }
                    
                    console.log(object)
                    let newNotes = [...notes]
                    object.createdAt = new Date(object.createdAt)
                    object.updatedAt = new Date(object.updatedAt)
                    newNotes.unshift(object)
                    setNotes(newNotes)
                    setCreatingNote(false)
                    newNote.current = undefined
                }
            )
            
        }
        else{
            let updatedNoteIndex = notes.findIndex((aNote) => (note.id)? note.id == aNote.id : false)
            
            updateNote(note)
        }
    }

    
    
    return(
        <main 
        className="w-screen h-screen grid grid-flow-row grid-cols-8 selection:text-white selection:bg-slate-950 overflow-hidden"
        >
        <PanelDashboard 
            onCreateNote={handleCreateNote}
        />

        <NotesBoard
            tailwindStyles="col-start-2 col-end-9"
            notes={notes}
            setNotes={setNotes}
            
        />

        {
            creatingNote 
            && 
            <EditNoteMenu
                noteProperties={newNote.current}
                onSyncData={handleSyncData}
                setIsActive={setCreatingNote}
            />
        }

    </main>
    )
}

export default App