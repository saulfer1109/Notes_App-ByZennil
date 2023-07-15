import { AnimatePresence, motion, Reorder } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { NoteAttributes } from "../types/notes.types"
import { EditNoteMenu } from "./EditNoteMenu"
import { Note } from "./Note"
import { SyncMessage } from "./SyncMessage"

interface props {
    tailwindStyles: string,
    notes: Array<NoteAttributes>
    setNotes: React.Dispatch<Array<NoteAttributes>>
}

export const NotesBoard = ({tailwindStyles, notes, setNotes}:props) => {

    
    const [editing, setEditing] = useState(false)
    const [showingSyncMessage, setShowingSyncMessage] = useState(false)
    const [isAccomplishedSync, setAccomplishedSync] = useState(false)
    let activeNote = useRef<NoteAttributes | undefined>(undefined)

    useEffect(()=>{
        let showingSyncMessageTimeOut = setTimeout(() => {
            setShowingSyncMessage(false)
        },3000)
        
        return () => {
            clearTimeout(showingSyncMessageTimeOut)
        }
    },[showingSyncMessage])

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

    const handleDelete = (noteId: number):void => {
        console.log(`Deleting ${noteId}`)
        let answer = window.confirm('Are you sure?')

        if (!answer)
            return
        
        let newNotes = [...notes]

        let changedNoteIndex = findIndexNoteById(noteId)
        
        newNotes.splice(changedNoteIndex,1)

        setNotes(newNotes)

        activeNote.current = notes[changedNoteIndex]
        setAccomplishedSync(Boolean(Math.floor(Math.random()*2)))
        setShowingSyncMessage(true)

    }

    const handleOnSyncData = (changes:Partial<NoteAttributes>) => {
        console.log(changes)

        let newNotes = [...notes]
        let changedNoteIndex = findIndexNoteById(changes.id!)
        
        newNotes[changedNoteIndex] = {...newNotes[changedNoteIndex], ...changes}

        setNotes(newNotes)
        
        setAccomplishedSync(Boolean(Math.floor(Math.random()*2)))
        setShowingSyncMessage(true)
    }

    const handleSyncMessageDissapear = () => {
        activeNote.current = undefined
        setShowingSyncMessage(false)
    }

    return (
        <motion.section 
            className={`${tailwindStyles} pt-10 px-32 grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))]  gap-x-24 gap-y-8 overflow-y-scroll`}
            variants={{
                undeployed: {},
                deployed: {
                    transition: {
                        delayChildren: 0.1,
                        staggerChildren: 0.2
                    }
                }
                
            }}
            animate= "deployed"
        >

            <AnimatePresence>
                {
                    editing && 
                    <EditNoteMenu
                        onSyncData={handleOnSyncData}
                        noteProperties={activeNote.current}
                        setIsActive={setEditing}
                    />
                }
            </AnimatePresence>
            
            <Reorder.Group className="grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] grid-flow-row-dense gap-x-5 gap-y-5"
                values={notes}
                onReorder={(newOrder) => setNotes(newOrder)}
            >
                {...notes.map((note) =>
                    <Reorder.Item
                        key={note.id}
                        value={note}
                    >
                        <Note
                        key={note.id}
                        noteProperties={note}
                        onEdition={handleEdition}
                        onFavoriteToggle={handleFavoriteToggle}
                        onDelete={handleDelete}
                    />
                    </Reorder.Item>
                )}
            </Reorder.Group>

            <AnimatePresence>
                {   
                    showingSyncMessage && 
                    <SyncMessage
                        note={activeNote.current}
                        accomplished = {isAccomplishedSync}
                        disappear={handleSyncMessageDissapear}
                    />
                }
            </AnimatePresence>

        </motion.section>
    )
}