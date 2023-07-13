import { MouseEvent, MouseEventHandler} from 'react'
import addNoteIcon from '../assets/addNote.svg'
import { useState } from 'react'

const colors = [
    "bg-green-600",
    "bg-blue-600",
    "bg-red-600",
    "bg-yellow-400",
    "bg-purple-600",
]

export type CreateNoteHandler = (color: string ) => void

export const CreateNoteButton = ({onCreateNote}:{onCreateNote:CreateNoteHandler}) => {

    const [showingColorOptions, setShowingColorOptions] = useState(false)



    const handleShowColorOptions: MouseEventHandler<HTMLButtonElement> = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        
        setShowingColorOptions(!showingColorOptions)
    }

    const createNoteHandler: MouseEventHandler<HTMLLIElement> = (event: MouseEvent<HTMLLIElement>) => {
        event.preventDefault()
        let index = parseInt(event.currentTarget.id)
        onCreateNote(colors[index])
    }
    

    return (
        <section className="flex flex-col items-center gap-7 ">
            <button  onClick={handleShowColorOptions}  className={`${showingColorOptions?"rotate-45 w-10":"w-8"} hover:scale-110 outline-none select-none transition-all `}>
                <img src={addNoteIcon} alt="Add Note Icon" />   
            </button>
            

                <ul  className={"flex flex-col items-center gap-3"}>
                    {
                        ...colors.map( (color:string, index:number) => 
                            <li id={''+index} key={color} onClick={createNoteHandler} className={`${(showingColorOptions? `w-5` : `w-0 `)}  hover:scale-125 max-w-xs aspect-square rounded-full cursor-pointer transition-all ${color}`} ></li>
                        )
                    } 
                </ul>
            
        </section>
)
}


