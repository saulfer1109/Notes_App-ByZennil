import { Note, noteProps } from "./Note"


interface props {
    tailwindStyles: string,
    notes: Array<noteProps>
}

export const NotesBoard = ({tailwindStyles,notes}:props) => {

    return (
        <section className={`${tailwindStyles} pt-10 px-32 grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] grid-rows-[repeat(auto-fit,minmax(100px,12rem))] gap-x-24 gap-y-8 overflow-y-scroll`}>
            {...notes.map(
                (note => 
                    <Note
                        key={note.id}
                        id={note.id}
                        name={note.name}
                        content={note.content}
                        isFavorite={note.isFavorite}
                        color={note.color}
                        date={note.date}
                    />   
                )
            )}
        </section>
    )
}