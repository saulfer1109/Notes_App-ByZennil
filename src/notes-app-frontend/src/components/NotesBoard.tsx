import { AnimatePresence, motion, Reorder } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { NoteAttributes } from "../types/notes.types"
import { EditNoteMenu } from "./EditNoteMenu"
import { Note } from "./Note"
import { SyncMessage } from "./SyncMessage"
import { deleteNote, updateNote } from "../services/NoteServices"

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
        const index = findIndexNoteById(noteId)
        const newValue = !notes[index].isFavorite
        
        let changes: Partial<NoteAttributes> = {id: noteId, isFavorite: newValue}

        updateNote(changes).then(
            response => {
                if(response.ok){
                    let newNotes = [...notes]
                    newNotes[index].isFavorite = newValue
                    setNotes(newNotes)
                    activeNote.current = newNotes[index]
                    setAccomplishedSync(true)
                    setShowingSyncMessage(true)
                }
            }
        )

        
        
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
        
        deleteNote(noteId)
            .then(done => {
                if(done){
                    let newNotes = [...notes]

                    let changedNoteIndex = findIndexNoteById(noteId)
                    
                    newNotes.splice(changedNoteIndex,1)
    
                    setNotes(newNotes)
    
                    activeNote.current = notes[changedNoteIndex]
                    setAccomplishedSync(true)
                    setShowingSyncMessage(true) 
                }
                else{ 
                    setAccomplishedSync(false)
                    setShowingSyncMessage(true)     
                }
            })

    }

    const handleOnSyncData = (changes:Partial<NoteAttributes>) => {
        console.log(changes)
        
        updateNote(changes)
            .then(
                (response) => {
                    if(response.ok){
                        let newNotes = [...notes]
                        let changedNoteIndex = findIndexNoteById(changes.id!)
                        newNotes[changedNoteIndex] = {...newNotes[changedNoteIndex], ...changes}

                        setNotes(newNotes)
                        
                        setAccomplishedSync(true)
                        setShowingSyncMessage(true)
                    }
                    else{
                        setAccomplishedSync(false)
                        setShowingSyncMessage(true)

                    }
                }
            )

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