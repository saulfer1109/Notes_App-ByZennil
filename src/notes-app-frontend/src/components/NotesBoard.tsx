import { useEffect, useRef, useState } from "react"
import { Note} from "./Note"
import { NoteAttributes } from "../types/notes.types"
import { EditNoteMenu } from "./EditNoteMenu"
import { SyncMessage } from "./SyncMessage"
import { AnimatePresence } from "framer-motion"
import { motion } from 'framer-motion'

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

        console.log(answer)
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
            
            {...notes.map((note) =>
                <Note
                    key={note.id}
                    noteProperties={note}
                    onEdition={handleEdition}
                    onFavoriteToggle={handleFavoriteToggle}
                    onDelete={handleDelete}
                />
            )}

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