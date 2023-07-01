import { Note, NoteProps } from "./Note"


interface props {
    tailwindStyles: string,
    notes: Array<NoteProps>
}

export const NotesBoard = ({tailwindStyles,notes}:props) => {
    

    const handleFavoriteToggle = (noteId:number) => {
        
    }
    const handleEdition = (noteId:number) => {

    }

    return (
        <section className={`${tailwindStyles} pt-10 px-32 grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] grid-rows-[repeat(auto-fit,minmax(100px,12rem))] gap-x-24 gap-y-8 overflow-y-scroll`}>
            {...notes.map(
                (note => 
                    <Note
                        oNote={note}
                        onFavoriteToggle={handleFavoriteToggle}
                        onEdition={handleEdition}
                    />   
                )
            )}
        </section>
    )
}