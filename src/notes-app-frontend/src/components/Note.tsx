
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
        <article className={`${colors.find((value) => value.includes(note.color))} flex flex-col gap-4 rounded-2xl py-3 px-8`}>
            <h3 className="font-bold text-lg">{note.name}</h3>
            
            <section className="text-sm">{note.content}</section>

            <aside className="text-xs mt-auto text-slate-900">{note.date.toDateString()}</aside>
            
            <button>
                {note.isFavorite}
            </button>
        </article>
    )
}