import {  useRef, useState } from "react"
import { PanelDashboard } from "../../components/PanelDashboard"
import { NotesBoard } from "../../components/NotesBoard"
import { NoteAttributes, NoteCreationAttributes, isNoteCreationAttributes } from "../../types/notes.types"
import { EditNoteMenu } from "../../components/EditNoteMenu"
import { createNote } from "../../services/UserServices"


const notesArray: Array<NoteAttributes> = [
    {
        id: 5,
        name: 'Primera Nota',
        content: 'Contenido de la primera nota',
        color: 'green',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        isFavorite: true
    },
    {
        id: 6,
        name: 'Segunda Nota',
        content: 'Contenido de la segunda nota',
        color: 'red',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        isFavorite: false
    },
    {
        id: 7,
        name: 'Tercera Nota',
        content: 'Contenido de la tercera nota',
        color: 'yellow',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        isFavorite: true
    },
    {
        id: 8,
        name: 'Tercera Nota',
        content: 'Contenido de la tercera nota',
        color: 'yellow',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        isFavorite: true
    },
    {
        id: 9,
        name: 'Tercera Nota',
        content: 'Contenido de la tercera nota',
        color: 'yellow',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        isFavorite: true
    },
    {
        id: 10,
        name: 'Tercera Nota',
        content: 'Contenido de la tercera nota',
        color: 'yellow',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        isFavorite: true
    },
/*     {
        name: 'Tercera Nota',
        content: 'Contenido de la tercera nota',
        color: 'yellow',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        isFavorite: true
    },
    {
        name: 'Tercera Nota',
        content: 'Contenido de la tercera nota',
        color: 'yellow',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        isFavorite: true
    },
    {
        name: 'Tercera Nota',
        content: 'Contenido de la tercera nota',
        color: 'yellow',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        isFavorite: true
    },
    {
        name: 'Tercera Nota',
        content: 'Contenido de la tercera nota',
        color: 'yellow',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        isFavorite: true
    },
    {
        name: 'Tercera Nota',
        content: 'Contenido de la tercera nota',
        color: 'yellow',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        isFavorite: true
    },
    {
        name: 'Tercera Nota',
        content: 'Contenido de la tercera nota',
        color: 'yellow',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        isFavorite: true
    },
    {
        name: 'Tercera Nota',
        content: 'Contenido de la tercera nota',
        color: 'yellow',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        isFavorite: true
    },
    {
        name: 'Tercera Nota',
        content: 'Contenido de la tercera nota',
        color: 'yellow',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        isFavorite: true
    }, */


]

const App = () => {

    const [notes, setNotes] = useState(notesArray)
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