import { useRef, useState } from "react"
import { PanelDashboard } from "../../components/PanelDashboard"
import { NotesBoard } from "../../components/NotesBoard"
import { NoteAttributes } from "../../types/notes.types"
import { EditNoteMenu } from "../../components/EditNoteMenu"


const notesArray: Array<NoteAttributes> = [
    {
        id: 5,
        name: 'Primera Nota',
        content: 'Contenido de la primera nota',
        color: 'green',
        date: new Date(Date.now()),
        isFavorite: true
    },
    {
        id: 6,
        name: 'Segunda Nota',
        content: 'Contenido de la segunda nota',
        color: 'red',
        date: new Date(Date.now()),
        isFavorite: false
    },
    {
        id: 7,
        name: 'Tercera Nota',
        content: 'Contenido de la tercera nota',
        color: 'yellow',
        date: new Date(Date.now()),
        isFavorite: true
    },
    {
        id: 8,
        name: 'Tercera Nota',
        content: 'Contenido de la tercera nota',
        color: 'yellow',
        date: new Date(Date.now()),
        isFavorite: true
    },
    {
        id: 9,
        name: 'Tercera Nota',
        content: 'Contenido de la tercera nota',
        color: 'yellow',
        date: new Date(Date.now()),
        isFavorite: true
    },
    {
        id: 10,
        name: 'Tercera Nota',
        content: 'Contenido de la tercera nota',
        color: 'yellow',
        date: new Date(Date.now()),
        isFavorite: true
    },
/*     {
        name: 'Tercera Nota',
        content: 'Contenido de la tercera nota',
        color: 'yellow',
        date: new Date(Date.now()),
        isFavorite: true
    },
    {
        name: 'Tercera Nota',
        content: 'Contenido de la tercera nota',
        color: 'yellow',
        date: new Date(Date.now()),
        isFavorite: true
    },
    {
        name: 'Tercera Nota',
        content: 'Contenido de la tercera nota',
        color: 'yellow',
        date: new Date(Date.now()),
        isFavorite: true
    },
    {
        name: 'Tercera Nota',
        content: 'Contenido de la tercera nota',
        color: 'yellow',
        date: new Date(Date.now()),
        isFavorite: true
    },
    {
        name: 'Tercera Nota',
        content: 'Contenido de la tercera nota',
        color: 'yellow',
        date: new Date(Date.now()),
        isFavorite: true
    },
    {
        name: 'Tercera Nota',
        content: 'Contenido de la tercera nota',
        color: 'yellow',
        date: new Date(Date.now()),
        isFavorite: true
    },
    {
        name: 'Tercera Nota',
        content: 'Contenido de la tercera nota',
        color: 'yellow',
        date: new Date(Date.now()),
        isFavorite: true
    },
    {
        name: 'Tercera Nota',
        content: 'Contenido de la tercera nota',
        color: 'yellow',
        date: new Date(Date.now()),
        isFavorite: true
    }, */


]

const App = () => {

    const [notes, setNotes] = useState(notesArray)
    const [creatingNote, setCreatingNote] = useState<boolean>(false)
    let newNote = useRef<NoteAttributes | undefined>(undefined)
    
    

    const handleCreateNote = () => {
   
    }

    const handleSyncData = () => {

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