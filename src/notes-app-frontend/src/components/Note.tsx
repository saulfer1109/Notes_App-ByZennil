import favoriteUnsetIcon from '../assets/favoriteUnset.svg'
import favoritesetIcon from '../assets/favoriteSet.svg'
import editIcon from '../assets/edit.svg'
import { useState } from 'react'

export interface NoteProps {
    id:number
    name: string
    content: string
    color: string
    date: Date
    isFavorite: boolean
}

const colors = [
    "bg-green-600",
    "bg-blue-600",
    "bg-red-600",
    "bg-yellow-400",
    "bg-purple-600",
]

type NoteEvent = (noteId:number) => void

export const Note = ({oNote,onFavoriteToggle,onEdition}:{oNote: NoteProps, onFavoriteToggle: NoteEvent | undefined, onEdition: NoteEvent | undefined}) => {

    const [note, setNote] = useState(oNote)

    const toggleFavorite = () => {
        console.log('Favorite toggled')

        
        if (onFavoriteToggle){
            onFavoriteToggle(note.id)
            let newNote = {...note}
            newNote.isFavorite = !newNote.isFavorite
            setNote(newNote)
        }
    }
    const handleEdit = () => {
        console.log('Edition activated')

        if (onEdition)
            onEdition(note.id)
    }


    return (
        <article className={`${colors.find((value) => value.includes(note.color))} group flex flex-col gap-4 rounded-2xl py-3 px-8 relative overflow-hidden`}>
            <h3 className="font-bold text-lg">{note.name}</h3>
            
            <section className="text-sm text-ellipsis">{note.content}</section>

            <aside className="text-xs mt-auto text-slate-900">{note.date.toDateString()}</aside>
            
            <button 
                className="group-hover:opacity-100 focus:opacity-100 opacity-0 transition-all absolute bg-slate-950 top-3 right-3 rounded-full aspect-square h-6 hover:translate-x-1 hover:-translate-y-1 hover:h-8  flex justify-center items-center"
                onClick={toggleFavorite}
            >
                <img src={note.isFavorite? favoritesetIcon:favoriteUnsetIcon} alt="" 
                    className="h-full"
                />

            </button>

            <button 
                className="group-hover:opacity-100 focus:opacity-100 opacity-0 transition-all absolute bg-slate-950 bottom-3 right-3 rounded-full aspect-square h-6 hover:translate-x-1 hover:translate-y-1 hover:h-8 flex justify-center items-center"
                onClick={handleEdit}
            >
                <img src={editIcon} alt="Edition button" 
                    className="h-full"
                />
            </button>

        </article>
    )
}