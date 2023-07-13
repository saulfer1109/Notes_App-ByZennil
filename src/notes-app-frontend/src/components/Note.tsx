import { motion } from 'framer-motion'
import favoriteUnsetIcon from '../assets/favoriteUnset.svg'
import favoritesetIcon from '../assets/favoriteSet.svg'
import editIcon from '../assets/edit.svg'
import deleteIcon from '../assets/deleteNote.svg'
import { colors } from '../constants'
export interface NoteProps {
    id:number
    name: string
    content: string
    color: string
    date: Date
    isFavorite: boolean
}


type NoteEvent = (noteId:number) => void

export const Note = ({noteProperties, onFavoriteToggle, onEdition, onDelete}:{noteProperties: NoteProps, onFavoriteToggle: NoteEvent | undefined, onEdition: NoteEvent | undefined, onDelete: NoteEvent | undefined}) => {

    const toggleFavorite = () => {
        console.log('Favorite toggled')

        
        if (onFavoriteToggle){
            onFavoriteToggle(noteProperties.id)
        }
    }
    const handleEdit = () => {
        console.log('Edition activated')

        if (onEdition){
            onEdition(noteProperties.id)
        }
    }

    const handleDelete = () => {
        console.log('Deletion activated')

        if (onDelete){
            onDelete(noteProperties.id)
        }
    }


    return (
        <motion.article 
            variants={{
                undeployed: {
                    opacity: 0, 
                    y: 20, 
                    transition: { duration: 0.2 } 
                },
                deployed: {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 300, damping: 24 }
                }
            }}
            initial = {{ opacity: 0, scale: 1.2 }}
            animate = {{ opacity: 1, scale: 1 }}
            
            whileHover={{scale: 1.1, transition: { delay: 0 }}}
            className={`${colors.find((value) => value.includes(noteProperties.color))} group flex flex-col gap-4 rounded-2xl py-3 px-8 relative overflow-hidden z-1 min-h-[12rem] max-h-[5rem]`}>
            <h3 className="font-bold text-lg">{noteProperties.name}</h3>
            
            <section className="text-sm text-ellipsis">{noteProperties.content}</section>

            <aside className="text-xs mt-auto text-slate-900">{noteProperties.date.toDateString()}</aside>
            
            <button 
                className="group-hover:opacity-100 focus:opacity-100 opacity-0 transition-all absolute bg-slate-950 top-3 right-3 rounded-full aspect-square h-6 hover:scale-125  flex justify-center items-center"
                onClick={toggleFavorite}
            >
                <img src={noteProperties.isFavorite? favoritesetIcon:favoriteUnsetIcon} alt="" 
                    className="h-full"
                />

            </button>

            <button 
                className="group-hover:opacity-100 focus:opacity-100 opacity-0 transition-all absolute bg-slate-950 bottom-3 right-3 rounded-full aspect-square h-6 hover:scale-125 flex justify-center items-center"
                onClick={handleEdit}
            >
                <img src={editIcon} alt="Edition button" 
                    className="h-full"
                />
            </button>

            <button 
                className="group-hover:opacity-100 focus:opacity-100 opacity-0 transition-all absolute bg-slate-950 bottom-1/2 translate-y-1/2 right-3 rounded-full aspect-square h-6 hover:scale-125 flex justify-center items-center p-1"
                onClick={handleDelete}
            >
                <img src={deleteIcon} alt="Edition button" 
                    className="h-full"
                />
            </button>

        </motion.article>
    )
}