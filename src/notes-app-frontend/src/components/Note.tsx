import favoriteUnsetIcon from '../assets/favoriteUnset.svg'
import favoritesetIcon from '../assets/favoriteSet.svg'
import editIcon from '../assets/edit.svg'
export interface noteProps {
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

export const Note = (note: noteProps) => {

    return (
        <article className={`${colors.find((value) => value.includes(note.color))} group flex flex-col gap-4 rounded-2xl py-3 px-8 relative overflow-hidden`}>
            <h3 className="font-bold text-lg">{note.name}</h3>
            
            <section className="text-sm text-ellipsis">{note.content}</section>

            <aside className="text-xs mt-auto text-slate-900">{note.date.toDateString()}</aside>
            
            <button className="group-hover:opacity-100 opacity-0 transition-all absolute bg-slate-950 top-3 right-3 rounded-full">
                <img src={note.isFavorite? favoritesetIcon:favoriteUnsetIcon} alt="" />

            </button>
            <button className="group-hover:opacity-100 opacity-0 transition-all absolute bg-slate-950 bottom-3 right-3 rounded-full">
                <img src={editIcon} alt="" />
            </button>

        </article>
    )
}